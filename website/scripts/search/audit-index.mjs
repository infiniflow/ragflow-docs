#!/usr/bin/env node
/**
 * Search health check: verifies that every URL present in the Algolia index
 * still resolves on the live site.
 *
 * Usage:
 *   node scripts/search/audit-index.mjs                 # audit (default: 300 URLs, 5% budget)
 *   node scripts/search/audit-index.mjs --limit=0       # audit every indexed URL
 *   node scripts/search/audit-index.mjs --prune         # delete dead records (needs ALGOLIA_ADMIN_KEY)
 *   node scripts/search/audit-index.mjs --threshold=0   # fail on a single dead URL
 *
 * Exits with code 1 when the share of dead URLs exceeds the threshold, so it can
 * be wired into CI as a regression alarm.
 */

import {hasAdminKey, mapWithConcurrency, readAllObjects, batchWrite, searchConfig, waitForTask} from './lib/algolia.mjs';

const args = new Map(
  process.argv
    .slice(2)
    .filter((argument) => argument.startsWith('--'))
    .map((argument) => {
      const [name, value] = argument.replace(/^--/, '').split('=');
      return [name, value ?? 'true'];
    }),
);

const LIMIT = args.has('limit') ? Number(args.get('limit')) : 300;
const THRESHOLD = args.has('threshold') ? Number(args.get('threshold')) : 0.05;
const PRUNE = args.get('prune') === 'true';
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY ?? 8);

async function checkUrl(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: {'user-agent': 'ragflow-search-audit/1.0'},
        signal: AbortSignal.timeout(30_000),
      });
      await response.body?.cancel();
      if (response.status === 404 || response.status === 410) {
        return 'dead';
      }
      return response.ok ? 'ok' : 'error';
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  return 'error';
}

function sample(items, count) {
  return items.slice(0, count);
}

async function main() {
  const key = searchConfig.adminKey ?? searchConfig.searchKey;
  const objects = await readAllObjects(searchConfig.indexName, {
    key,
    attributesToRetrieve: ['objectID', 'url_without_anchor', 'url', 'version'],
  });
  console.log(`[audit] ${objects.length} objects in "${searchConfig.indexName}"`);

  const byUrl = new Map();
  for (const object of objects) {
    const url = object.url_without_anchor ?? object.url?.split('#')[0];
    if (!url) {
      continue;
    }
    if (!byUrl.has(url)) {
      byUrl.set(url, []);
    }
    byUrl.get(url).push(object.objectID);
  }

  const allUrls = [...byUrl.keys()].sort();
  const checkedUrls = LIMIT > 0 ? sample(allUrls, LIMIT) : allUrls;
  console.log(`[audit] checking ${checkedUrls.length}/${allUrls.length} unique URLs`);

  const results = await mapWithConcurrency(checkedUrls, CONCURRENCY, async (url) => ({
    url,
    status: await checkUrl(url),
  }));

  const dead = results.filter((result) => result.status === 'dead').map((result) => result.url);
  const errors = results.filter((result) => result.status === 'error').map((result) => result.url);
  const ratio = results.length === 0 ? 0 : dead.length / results.length;

  console.log(
    `[audit] ok=${results.length - dead.length - errors.length} dead=${dead.length} ` +
      `unreachable=${errors.length} (dead ratio ${(ratio * 100).toFixed(1)}%)`,
  );
  for (const url of sample(dead, 20)) {
    console.log(`[audit] 404 ${url}`);
  }
  for (const url of sample(errors, 10)) {
    console.log(`[audit] err ${url}`);
  }

  if (PRUNE && dead.length > 0) {
    if (!hasAdminKey()) {
      console.warn('[audit] --prune needs ALGOLIA_ADMIN_KEY, skipping deletion');
    } else {
      const deadSet = new Set(dead);
      const objectIds = [...byUrl.entries()]
        .filter(([url]) => deadSet.has(url))
        .flatMap(([, ids]) => ids);
      const tasks = await batchWrite(
        searchConfig.indexName,
        objectIds.map((objectID) => ({action: 'deleteObject', body: {objectID}})),
        {key: searchConfig.adminKey, label: 'prune dead'},
      );
      for (const taskId of tasks.filter((taskId) => taskId !== undefined)) {
        await waitForTask(searchConfig.indexName, taskId, {key: searchConfig.adminKey});
      }
      console.log(`[audit] pruned ${objectIds.length} dead records`);
    }
  }

  if (ratio > THRESHOLD) {
    console.error(`[audit] dead URL ratio ${(ratio * 100).toFixed(1)}% exceeds ${(THRESHOLD * 100).toFixed(1)}%`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`[audit] ${error.message}`);
  process.exit(1);
});
