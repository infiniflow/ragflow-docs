#!/usr/bin/env node
/**
 * Keep retired URLs alive with 301s instead of letting them 404.
 *
 * The docs are re-synced from infiniflow/ragflow every few hours, releases swap
 * the whole `/docs/<version>/` tree, and pages get moved between folders. Every
 * one of those changes leaves search engines and the Algolia index pointing at
 * URLs that no longer exist.
 *
 * This script diffs the URL set of the last known snapshot
 * (`redirects/sitemap-baseline.json`) against the current build and appends the
 * disappeared URLs to `redirects/generated.json`, which
 * `docusaurus.config.ts` feeds into `@docusaurus/plugin-client-redirects`.
 *
 * Usage:
 *   node scripts/search/redirects.mjs                 # diff baseline vs ./build/sitemap.xml
 *   node scripts/search/redirects.mjs --live          # diff baseline vs the live sitemap
 *   node scripts/search/redirects.mjs --update        # refresh the baseline from the live site
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import {searchConfig} from './lib/algolia.mjs';

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(ROOT, 'redirects/sitemap-baseline.json');
const GENERATED_PATH = path.resolve(ROOT, 'redirects/generated.json');
const BUILD_SITEMAP = path.resolve(ROOT, 'build/sitemap.xml');
const MAX_REDIRECTS = 3000;

const USE_LIVE = process.argv.includes('--live');
const UPDATE_BASELINE = process.argv.includes('--update');

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1]);
}

async function fetchSitemap(url, depth = 0) {
  const response = await fetch(url, {headers: {'user-agent': 'ragflow-search-tooling/1.0'}});
  if (!response.ok) {
    throw new Error(`GET ${url} -> ${response.status}`);
  }
  const xml = await response.text();
  const locs = extractLocs(xml);
  if (/<sitemapindex/i.test(xml) && depth < 3) {
    const nested = await Promise.all(locs.map((child) => fetchSitemap(child, depth + 1)));
    return nested.flat();
  }
  return locs;
}

function normalize(url) {
  return url.replace(`${searchConfig.siteUrl}`, '').replace(/\/+$/, '') || '/';
}

function segments(urlPath) {
  return urlPath.split('/').filter(Boolean);
}

/** Strip a `/docs/<version>/` prefix, if any. */
function withoutVersionPrefix(urlPath) {
  const parts = segments(urlPath);
  if (parts[0] === 'docs' && parts[1]?.startsWith('v') && /^v\d/.test(parts[1])) {
    return `/${['docs', ...parts.slice(2)].join('/')}`;
  }
  return null;
}

function pickTarget(removedPath, currentSet) {
  const deversioned = withoutVersionPrefix(removedPath);
  if (deversioned && currentSet.has(deversioned)) {
    return deversioned;
  }

  const lastSegment = segments(removedPath).at(-1);
  if (lastSegment) {
    const candidates = [...currentSet].filter((urlPath) => segments(urlPath).at(-1) === lastSegment);
    if (candidates.length === 1) {
      return candidates[0];
    }
  }

  const firstSegment = segments(removedPath)[0];
  const fallback = firstSegment ? `/${firstSegment}` : '/';
  return currentSet.has(fallback) || fallback !== '/docs' ? fallback : '/docs';
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

async function main() {
  const liveSitemapUrl = `${searchConfig.siteUrl}/sitemap.xml`;

  if (UPDATE_BASELINE) {
    const urls = (await fetchSitemap(liveSitemapUrl)).map(normalize);
    await fs.mkdir(path.dirname(BASELINE_PATH), {recursive: true});
    await fs.writeFile(
      BASELINE_PATH,
      `${JSON.stringify({capturedAt: new Date().toISOString(), source: liveSitemapUrl, urls: [...urls].sort()}, null, 2)}\n`,
    );
    console.log(`[redirects] baseline captured: ${urls.length} URLs -> ${BASELINE_PATH}`);
    return;
  }

  const baseline = await readJson(BASELINE_PATH, {urls: []});
  const baselineUrls = new Set(baseline.urls ?? []);

  let currentUrls;
  if (!USE_LIVE) {
    try {
      currentUrls = extractLocs(await fs.readFile(BUILD_SITEMAP, 'utf8')).map(normalize);
    } catch {
      console.warn('[redirects] build/sitemap.xml not found, falling back to the live sitemap');
    }
  }
  currentUrls ??= (await fetchSitemap(liveSitemapUrl)).map(normalize);

  const currentSet = new Set(currentUrls);
  const removed = [...baselineUrls].filter((urlPath) => !currentSet.has(urlPath));

  const existing = await readJson(GENERATED_PATH, {redirects: []});
  const redirects = new Map((existing.redirects ?? []).map((entry) => [entry.from, entry.to]));

  let added = 0;
  for (const removedPath of removed) {
    if (redirects.size >= MAX_REDIRECTS) {
      console.warn(`[redirects] reached the ${MAX_REDIRECTS} entry cap, stopping`);
      break;
    }
    // Never shadow a route that still exists on the site.
    if (currentSet.has(removedPath)) {
      continue;
    }
    const target = pickTarget(removedPath, currentSet);
    if (!target || target === removedPath) {
      continue;
    }
    if (redirects.get(removedPath) !== target) {
      redirects.set(removedPath, target);
      added += 1;
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    note: 'Generated by scripts/search/redirects.mjs - do not edit by hand.',
    redirects: [...redirects.entries()]
      .map(([from, to]) => ({from, to}))
      .sort((a, b) => a.from.localeCompare(b.from)),
  };

  await fs.mkdir(path.dirname(GENERATED_PATH), {recursive: true});
  await fs.writeFile(GENERATED_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `[redirects] ${removed.length} URLs disappeared from the sitemap, ${added} new redirects ` +
      `(total ${payload.redirects.length}) -> ${GENERATED_PATH}`,
  );
}

main().catch((error) => {
  console.error(`[redirects] ${error.message}`);
  process.exit(1);
});
