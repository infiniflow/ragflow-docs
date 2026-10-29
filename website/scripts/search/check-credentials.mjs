#!/usr/bin/env node
/**
 * Credential doctor: tells you whether the configured Application ID, search key
 * and write key belong to the same Algolia app, and whether the index is reachable.
 *
 * Usage:
 *   yarn search:doctor
 *   ALGOLIA_APP_ID=XXXXXXXXXX ALGOLIA_SEARCH_KEY=... ALGOLIA_ADMIN_KEY=... yarn search:doctor
 *
 * Exit code 1 when the search key or the write key cannot reach the index.
 */

import {algoliaRequest, hasAdminKey, searchConfig} from './lib/algolia.mjs';

const mask = (value) => (value ? `${value.slice(0, 4)}…${value.slice(-4)} (${value.length} chars)` : '(not set)');

async function probe(label, fn) {
  try {
    const detail = await fn();
    console.log(`  [ok]   ${label}${detail ? ` - ${detail}` : ''}`);
    return true;
  } catch (error) {
    console.log(`  [fail] ${label} - ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('[doctor] resolved configuration');
  console.log(`  ALGOLIA_APP_ID     = ${searchConfig.appId}`);
  console.log(`  ALGOLIA_INDEX_NAME = ${searchConfig.indexName}`);
  console.log(`  search key         = ${mask(searchConfig.searchKey)}`);
  console.log(`  write key          = ${mask(searchConfig.adminKey)}`);
  console.log('');

  // A brand-new app has no index yet: "not found" still proves the key is valid.
  const isMissingIndex = (error) => /\b404\b|does not exist|not found/i.test(error.message);

  console.log('[doctor] probing the application');
  const searchOk = await probe('search key: query index', async () => {
    try {
      const response = await algoliaRequest({
        method: 'POST',
        path: `/1/indexes/${encodeURIComponent(searchConfig.indexName)}/query`,
        body: {query: '', hitsPerPage: 0},
        key: searchConfig.searchKey,
      });
      return `${response.nbHits ?? 0} records`;
    } catch (error) {
      if (isMissingIndex(error)) {
        return 'key is valid, index does not exist yet (run "yarn search:push")';
      }
      throw error;
    }
  });

  let writeOk = false;
  if (!hasAdminKey()) {
    console.log('  [skip] write key: ALGOLIA_ADMIN_KEY is not set');
  } else {
    writeOk = await probe('write key: read settings', async () => {
      try {
        const settings = await algoliaRequest({
          method: 'GET',
          path: `/1/indexes/${encodeURIComponent(searchConfig.indexName)}/settings`,
          key: searchConfig.adminKey,
        });
        const facets = settings.attributesForFaceting ?? [];
        return `attributesForFaceting=[${facets.join(', ')}]`;
      } catch (error) {
        if (isMissingIndex(error)) {
          return 'key is valid, index does not exist yet (run "yarn search:push")';
        }
        throw error;
      }
    });
  }

  console.log('');
  if (searchOk && (writeOk || !hasAdminKey())) {
    console.log(
      hasAdminKey()
        ? '[doctor] OK - app id, search key and write key all work on this index.'
        : '[doctor] OK for search. The write key is not set, so the index cannot be synced yet.',
    );
    return;
  }

  console.log('[doctor] MISMATCH - the failing key does not belong to this application.');
  console.log('[doctor] Algolia keys carry no app information, so a key issued for another');
  console.log('[doctor] app always returns 403 "Invalid Application-ID or API key" here.');
  console.log('[doctor] In the Algolia dashboard: pick the app in the top-left switcher,');
  console.log('[doctor] then Settings -> API Keys, and copy from the "Your Application ID",');
  console.log('[doctor] "Search API Key" and "Write API Key" fields of THAT app.');
  process.exit(1);
}

main().catch((error) => {
  console.error(`[doctor] ${error.message}`);
  process.exit(1);
});
