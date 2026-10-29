#!/usr/bin/env node
/**
 * Post-build hook: keep redirects and the Algolia index in lockstep with what
 * was just built.
 *
 * 1. regenerate `redirects/generated.json` from the sitemap diff, so URLs that
 *    disappeared since the last snapshot keep resolving (301) instead of 404ing;
 * 2. push the index derived from `build/` to Algolia and drop stale records.
 *
 * Both steps are best-effort so a search/redirect hiccup never blocks a deploy.
 * Set SEARCH_STRICT=1 to turn failures into a failed build.
 */

import {spawnSync} from 'node:child_process';
import path from 'node:path';

const STRICT = process.env.SEARCH_STRICT === '1';

if (process.env.SEARCH_SKIP_POSTBUILD === '1') {
  console.log('[postbuild] SEARCH_SKIP_POSTBUILD=1, skipping search/redirect steps');
  process.exit(0);
}

const steps = [
  {name: 'redirects', script: 'scripts/search/redirects.mjs'},
  {name: 'algolia-index', script: 'scripts/search/push-index.mjs'},
];

let failed = false;

for (const step of steps) {
  const scriptPath = path.resolve(process.cwd(), step.script);
  console.log(`[postbuild] ${step.name}: ${scriptPath}`);
  const result = spawnSync(process.execPath, [scriptPath], {stdio: 'inherit', env: process.env});
  if (result.status !== 0) {
    failed = true;
    console.error(`[postbuild] ${step.name} failed with exit code ${result.status}`);
  }
}

if (failed) {
  console.error('[postbuild] some search steps failed');
  if (STRICT) {
    process.exit(1);
  }
  console.error('[postbuild] continuing (set SEARCH_STRICT=1 to fail the build instead)');
}
