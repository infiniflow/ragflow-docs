/**
 * Minimal, dependency-free HTML helpers used to turn the freshly built static
 * site into Algolia records.
 *
 * We deliberately avoid a DOM parser: the only pages we consume are Docusaurus
 * output, whose structure is stable (one <article>/<main> per page, headings
 * with `id` anchors, paragraphs and list items as text carriers).
 */

const MAX_CONTENT_LENGTH = 4000;

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  copy: '©',
  reg: '®',
  trade: '™',
  times: '×',
};

export function decodeEntities(input) {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, entity) => {
    if (entity.startsWith('#')) {
      const code =
        entity[1] === 'x' || entity[1] === 'X'
          ? Number.parseInt(entity.slice(2), 16)
          : Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

export function toPlainText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]*>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

export function readMeta(html, name) {
  const tag = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, 'i'))?.[0];
  if (!tag) {
    return undefined;
  }
  return tag.match(/content=["']([^"']*)["']/i)?.[1];
}

export function readTitle(html) {
  const raw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return raw ? toPlainText(raw) : '';
}

/**
 * Narrow down the page markup to the part that carries documentation prose,
 * so navigation, sidebar and footer chrome never pollute the index.
 */
export function extractContentRoot(html) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (article) {
    return article[1];
  }
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (main) {
    return main[1];
  }
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return body ? body[1] : html;
}

// Headings drive section boundaries; paragraphs / list items / code blocks carry text.
const BLOCK_PATTERN =
  /<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>|<p\b[^>]*>([\s\S]*?)<\/p>|<li\b[^>]*>([\s\S]*?)<\/li>|<pre\b[^>]*>([\s\S]*?)<\/pre>/gi;

/**
 * Split a page into one section per heading, each carrying the heading path
 * (hierarchy.lvl0 .. lvl6) that Algolia / DocSearch renders as breadcrumbs.
 *
 * @returns {{type: string, anchor: string|null, hierarchy: Record<string, string|null>, content: string}[]}
 */
export function extractSections(html, lvl0 = 'Documentation') {
  // Breadcrumbs, pagination and sidebar navigation all live inside the content
  // root; they must never become search results.
  const root = extractContentRoot(html).replace(/<nav\b[\s\S]*?<\/nav>/gi, ' ');
  const sections = [];
  const headingPath = {};
  let anchor = null;
  let type = 'lvl1';
  let buffer = [];

  const flush = () => {
    const content = buffer.join('\n').trim();
    buffer = [];
    const hierarchy = { lvl0 };
    for (let level = 1; level <= 6; level += 1) {
      hierarchy[`lvl${level}`] = headingPath[level] ?? null;
    }
    // Text that appears before the first heading (breadcrumbs, doc badges) is
    // chrome, not content: skip it unless the page has no headings at all.
    if (!hierarchy.lvl1 && (Object.keys(headingPath).length > 0 || !content)) {
      return;
    }
    sections.push({
      type,
      anchor,
      hierarchy,
      content: content.slice(0, MAX_CONTENT_LENGTH),
    });
  };

  for (const match of root.matchAll(BLOCK_PATTERN)) {
    const [, headingTag, headingAttrs, headingInner, paragraph, listItem, codeBlock] = match;

    if (headingTag) {
      flush();
      const level = Number(headingTag[1]);
      const title = toPlainText(headingInner);
      for (let deeper = level; deeper <= 6; deeper += 1) {
        delete headingPath[deeper];
      }
      headingPath[level] = title || null;
      anchor = headingAttrs.match(/\bid=["']([^"']+)["']/i)?.[1] ?? null;
      type = `lvl${level}`;
      continue;
    }

    const text = toPlainText(paragraph ?? listItem ?? codeBlock ?? '');
    if (text) {
      buffer.push(text);
    }
  }

  flush();
  return sections;
}
