/**
 * Thin Algolia REST client (fetch only, no SDK) shared by the search tooling.
 *
 * Credentials:
 *   ALGOLIA_ADMIN_KEY  write key used to (re)build / prune the index. Required by
 *                      `push-index.mjs` and by `audit-index.mjs --prune`.
 *   ALGOLIA_APP_ID     defaults to the value in docusaurus.config.ts
 *   ALGOLIA_INDEX_NAME defaults to the value in docusaurus.config.ts
 *   SITE_URL           defaults to https://ragflow.io
 *
 * The fallback key below is the public search-only key that is already shipped
 * to every browser in docusaurus.config.ts, so it grants nothing extra.
 */

import fs from 'node:fs';
import path from 'node:path';

// Vercel/CI inject the variables directly; for local CLI runs fall back to the
// (gitignored) env files so `yarn search:push` works without exporting by hand.
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (typeof process.loadEnvFile === 'function' && fs.existsSync(envPath)) {
    try {
      process.loadEnvFile(envPath);
    } catch {
      // Malformed env file: the explicit checks below will report what is missing.
    }
  }
}

const DEFAULT_APP_ID = 'NXFTTRZRN9';
const DEFAULT_INDEX_NAME = 'ragflow-docs';
const DEFAULT_SEARCH_KEY = '12170a34d3bc7ad253ec94e1ac86b65b';
const BATCH_SIZE = 500;

export const searchConfig = {
  appId: process.env.ALGOLIA_APP_ID ?? DEFAULT_APP_ID,
  indexName: process.env.ALGOLIA_INDEX_NAME ?? DEFAULT_INDEX_NAME,
  searchKey: process.env.ALGOLIA_SEARCH_KEY ?? DEFAULT_SEARCH_KEY,
  adminKey: process.env.ALGOLIA_ADMIN_KEY ?? process.env.ALGOLIA_WRITE_KEY,
  siteUrl: (process.env.SITE_URL ?? 'https://ragflow.io').replace(/\/+$/, ''),
};

export function hasAdminKey() {
  return Boolean(searchConfig.adminKey);
}

function apiHost(path, method) {
  // Algolia serves reads from the DSN host and writes from the main host.
  const isRead = method === 'GET' || path.endsWith('/query') || path.endsWith('/browse');
  return `https://${searchConfig.appId}${isRead ? '-dsn' : ''}.algolia.net`;
}

export async function algoliaRequest({method = 'GET', path, body, query, key}) {
  const apiKey = key ?? searchConfig.adminKey ?? searchConfig.searchKey;
  const url = new URL(`${apiHost(path, method)}${path}`);
  for (const [name, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(name, String(value));
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      'X-Algolia-Application-Id': searchConfig.appId,
      'X-Algolia-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Algolia ${method} ${path} failed (${response.status}): ${text.slice(0, 500)}`);
  }
  return text ? JSON.parse(text) : {};
}

/** Iterate every object of the index (browse API, cursor based). */
export async function browseAllObjects(indexName, {key, attributesToRetrieve} = {}) {
  const objects = [];
  let cursor;
  for (;;) {
    const response = await algoliaRequest({
      method: 'POST',
      path: `/1/indexes/${encodeURIComponent(indexName)}/browse`,
      query: {cursor, hitsPerPage: 1000},
      body: attributesToRetrieve ? {attributesToRetrieve} : {},
      key,
    });
    objects.push(...(response.hits ?? []));
    cursor = response.cursor;
    if (!cursor) {
      return objects;
    }
  }
}

/** Fallback for keys without the browse ACL: paginate the search endpoint. */
export async function queryAllObjects(indexName, {key, attributesToRetrieve, hitsPerPage = 1000} = {}) {
  const objects = [];
  let total = 0;

  for (let page = 0; page < 1000; page += 1) {
    const response = await algoliaRequest({
      method: 'POST',
      path: `/1/indexes/${encodeURIComponent(indexName)}/query`,
      body: {query: '', page, hitsPerPage, attributesToRetrieve},
      key,
    });
    total = response.nbHits ?? total;
    objects.push(...(response.hits ?? []));
    if (page + 1 >= (response.nbPages ?? 0)) {
      break;
    }
  }

  if (total > objects.length) {
    console.warn(
      `[search] only ${objects.length}/${total} objects are reachable with this key ` +
        '(Algolia caps pagination - set ALGOLIA_ADMIN_KEY to inspect the whole index)',
    );
  }

  return objects;
}

export async function readAllObjects(indexName, options = {}) {
  try {
    return await browseAllObjects(indexName, options);
  } catch (error) {
    console.warn(`[search] browse failed (${error.message}), falling back to paginated query`);
    return queryAllObjects(indexName, options);
  }
}

/** Push add/update/delete operations in size-bounded batches. */
export async function batchWrite(indexName, requests, {key, label = 'batch'} = {}) {
  const taskIds = [];
  for (let offset = 0; offset < requests.length; offset += BATCH_SIZE) {
    const chunk = requests.slice(offset, offset + BATCH_SIZE);
    const response = await algoliaRequest({
      method: 'POST',
      path: `/1/indexes/${encodeURIComponent(indexName)}/batch`,
      body: {requests: chunk},
      key,
    });
    taskIds.push(response.taskID);
    console.log(
      `[search] ${label}: ${Math.min(offset + BATCH_SIZE, requests.length)}/${requests.length} records`,
    );
  }
  return taskIds;
}

export async function setIndexSettings(indexName, settings, {key} = {}) {
  return algoliaRequest({
    method: 'PUT',
    path: `/1/indexes/${encodeURIComponent(indexName)}/settings`,
    body: settings,
    key,
  });
}

export async function waitForTask(indexName, taskId, {key, timeoutMs = 120_000} = {}) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const response = await algoliaRequest({
      method: 'GET',
      path: `/1/indexes/${encodeURIComponent(indexName)}/task/${taskId}`,
      key,
    });
    if (response.status === 'published') {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  console.warn(`[search] task ${taskId} did not report "published" within ${timeoutMs}ms`);
}

/** Small promise pool so we do not hammer the live site with hundreds of sockets. */
export async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({length: Math.min(limit, items.length)}, async () => {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) {
        return;
      }
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}
