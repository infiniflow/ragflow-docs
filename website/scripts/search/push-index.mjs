#!/usr/bin/env node
/**
 * Build the Algolia index from the freshly generated static site.
 *
 * Why: the docs are synced from infiniflow/ragflow every few hours and the URL
 * space changes often (retired versions, renamed/moved pages). A hosted crawler
 * cannot keep up with that cadence, which is how dead links end up in search
 * results. Deriving the index from `build/` makes the index an exact mirror of
 * what is actually deployed.
 *
 * Usage:
 *   node scripts/search/push-index.mjs               # sync (needs ALGOLIA_ADMIN_KEY)
 *   node scripts/search/push-index.mjs --dry-run     # write records to .docusaurus/search-records.json
 *   node scripts/search/push-index.mjs --force       # allow a large shrink of the index
 *
 * Behaviour: records that no longer exist in the build output are deleted, so
 * pages removed from the site also disappear from search.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import {extractSections, readMeta, readTitle} from './lib/html.mjs';
import {
  batchWrite,
  hasAdminKey,
  readAllObjects,
  searchConfig,
  setIndexSettings,
  waitForTask,
} from './lib/algolia.mjs';

const BUILD_DIR = path.resolve(process.cwd(), 'build');
const DRY_RUN = process.argv.includes('--dry-run') || process.env.ALGOLIA_DRY_RUN === '1';
const FORCE = process.argv.includes('--force');
const SHRINK_GUARD_RATIO = 0.5;

const INDEX_SETTINGS = {
  searchableAttributes: [
    'hierarchy.lvl0',
    'hierarchy.lvl1',
    'hierarchy.lvl2',
    'hierarchy.lvl3',
    'hierarchy.lvl4',
    'hierarchy.lvl5',
    'hierarchy.lvl6',
    'content',
  ],
  attributesForFaceting: ['version', 'docusaurus_tag', 'language', 'type'],
  attributesToSnippet: ['content:10'],
  snippetEllipsisText: '…',
  // The site has ~4k records per version set; the legacy default of 1000 makes
  // `browse`-less clients (and the audit script) see only a slice of the index.
  paginationLimitedTo: 10000,
};

async function listHtmlFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') {
        continue;
      }
      files.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

/** build/docs/guides/x/index.html -> /docs/guides/x */
function urlPathForFile(filePath) {
  const relative = path.relative(BUILD_DIR, filePath).split(path.sep).join('/');
  const withoutIndex = relative.replace(/(^|\/)index\.html$/, '');
  const bare = withoutIndex === 'index.html' ? '' : withoutIndex.replace(/\.html$/, '');
  return `/${bare}`.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
}

function lvl0ForPath(urlPath) {
  if (urlPath.startsWith('/docs') || urlPath.startsWith('/basics')) {
    return 'Documentation';
  }
  if (urlPath.startsWith('/blog')) {
    return 'Blog';
  }
  return 'RAGFlow';
}

function buildRecordsForPage(html, urlPath) {
  if (readMeta(html, 'robots')?.includes('noindex')) {
    return [];
  }

  const url = `${searchConfig.siteUrl}${urlPath}`;
  const version = readMeta(html, 'docsearch:version');
  const docusaurusTag = readMeta(html, 'docsearch:docusaurus_tag');
  const language = readMeta(html, 'docsearch:language') ?? 'en';
  const title = readTitle(html);
  const sections = extractSections(html, lvl0ForPath(urlPath));

  return sections.map((section, index) => {
    const anchor = section.anchor ?? null;
    const hierarchy = {...section.hierarchy};
    // Pages without an <h1> still deserve a usable title in the result list.
    if (!hierarchy.lvl1 && title) {
      hierarchy.lvl1 = title;
    }

    return {
      objectID: anchor ? `${url}#${anchor}` : `${url}#${index}`,
      url: anchor ? `${url}#${anchor}` : url,
      url_without_anchor: url,
      anchor,
      type: section.type,
      hierarchy,
      content: section.content,
      ...(version ? {version: [version]} : {}),
      ...(docusaurusTag ? {docusaurus_tag: docusaurusTag} : {}),
      language,
    };
  });
}

async function collectRecords() {
  const files = await listHtmlFiles(BUILD_DIR);
  const records = new Map();

  for (const filePath of files) {
    const urlPath = urlPathForFile(filePath);
    // Never index the 404 page or any per-version 404 helper.
    if (urlPath === '/404' || urlPath.startsWith('/404')) {
      continue;
    }
    const html = await fs.readFile(filePath, 'utf8');
    if (readMeta(html, 'docsearch:docusaurus_tag') === undefined) {
      continue;
    }
    for (const record of buildRecordsForPage(html, urlPath)) {
      if (!records.has(record.objectID)) {
        records.set(record.objectID, record);
      }
    }
  }

  return [...records.values()];
}

async function main() {
  try {
    await fs.access(BUILD_DIR);
  } catch {
    throw new Error(`Build output not found at ${BUILD_DIR}. Run "yarn build" first.`);
  }

  console.log(`[search] scanning ${BUILD_DIR}`);
  const records = await collectRecords();
  const urls = new Set(records.map((record) => record.url_without_anchor));
  console.log(`[search] ${records.length} records for ${urls.size} pages`);

  if (records.length === 0) {
    throw new Error('Refusing to sync an empty index (0 records parsed from build output).');
  }

  if (DRY_RUN) {
    const outputPath = path.resolve(process.cwd(), '.docusaurus/search-records.json');
    await fs.mkdir(path.dirname(outputPath), {recursive: true});
    await fs.writeFile(outputPath, JSON.stringify(records, null, 2));
    console.log(`[search] dry run: wrote ${records.length} records to ${outputPath}`);
    return;
  }

  if (!hasAdminKey()) {
    console.warn(
      '[search] ALGOLIA_ADMIN_KEY is not set - skipping index sync. ' +
        'Set it in the deployment environment to keep search in sync with the site.',
    );
    return;
  }

  const indexName = searchConfig.indexName;
  // A fresh Algolia app has no index yet: reading it 404s, and that must mean
  // "nothing to clean up", not a failed deployment.
  let existing = [];
  try {
    existing = await readAllObjects(indexName, {key: searchConfig.adminKey, attributesToRetrieve: ['objectID']});
  } catch (error) {
    console.warn(`[search] index "${indexName}" is not readable yet (${error.message}) - starting from scratch`);
  }
  const nextIds = new Set(records.map((record) => record.objectID));
  const staleIds = existing.map((object) => object.objectID).filter((objectID) => !nextIds.has(objectID));

  console.log(`[search] index has ${existing.length} objects, ${staleIds.length} of them are no longer on the site`);

  if (existing.length > 0 && records.length < existing.length * SHRINK_GUARD_RATIO && !FORCE) {
    throw new Error(
      `Refusing to shrink the index from ${existing.length} to ${records.length} records ` +
        '(pass --force if this is intentional).',
    );
  }

  const tasks = [];
  if (staleIds.length > 0) {
    tasks.push(
      ...(await batchWrite(
        indexName,
        staleIds.map((objectID) => ({action: 'deleteObject', body: {objectID}})),
        {key: searchConfig.adminKey, label: 'delete stale'},
      )),
    );
  }

  tasks.push(
    ...(await batchWrite(
      indexName,
      records.map((record) => ({action: 'updateObject', body: record})),
      {key: searchConfig.adminKey, label: 'upsert'},
    )),
  );

  await setIndexSettings(indexName, INDEX_SETTINGS, {key: searchConfig.adminKey});

  for (const taskId of tasks.filter((taskId) => taskId !== undefined)) {
    await waitForTask(indexName, taskId, {key: searchConfig.adminKey});
  }

  console.log(`[search] index "${indexName}" synced: ${records.length} records, ${staleIds.length} stale removed`);
}

main().catch((error) => {
  console.error(`[search] ${error.message}`);
  process.exit(1);
});
