# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Search indexing (Algolia)

The site search uses the Algolia index configured in `docusaurus.config.ts`
(`ragflow-docs`). The index is **generated from the build output**, not crawled,
because the docs are re-synced from `infiniflow/ragflow` every few hours and the
URL space changes on every release.

`yarn build` runs `scripts/search/postbuild.mjs`, which:

1. diffs the current sitemap against `redirects/sitemap-baseline.json` and appends
   disappeared URLs to `redirects/generated.json` (picked up by
   `@docusaurus/plugin-client-redirects`, so retired pages keep resolving);
2. extracts one record per heading from `build/**/*.html` and syncs them to
   Algolia, deleting records whose page no longer exists.

Environment variables:

| Variable | Used by | Purpose |
| --- | --- | --- |
| `ALGOLIA_ADMIN_KEY` | index sync, `--prune` | Write/admin key. Without it the index step is skipped and the deploy still succeeds. Set it in the deployment environment (e.g. Vercel). |
| `ALGOLIA_APP_ID`, `ALGOLIA_INDEX_NAME` | all scripts + build | Optional overrides, default to the values in `docusaurus.config.ts`. Switching Algolia accounts is env-only. |
| `ALGOLIA_SEARCH_KEY` | build | Public search-only key used by the browser; override when moving to another Algolia app. |
| `SITE_URL` | all scripts | Base URL, defaults to `https://ragflow.io`. |
| `STRICT_LINKS` | build | `true` turns broken links/anchors into build errors. |
| `SEARCH_SKIP_POSTBUILD` | build | `1` skips the post-build search steps. |
| `SEARCH_STRICT` | build | `1` fails the build when a search step fails. |

Manual commands:

```bash
yarn search:push                    # rebuild/sync the index (needs ALGOLIA_ADMIN_KEY)
yarn search:push -- --dry-run       # write records to .docusaurus/search-records.json only
yarn search:audit                   # check indexed URLs against the live site
yarn search:audit -- --prune        # ...and delete the dead records
yarn redirects:update               # refresh the sitemap baseline from the live site
yarn redirects:generate             # regenerate redirects/generated.json
```

The weekly `Search Health` workflow runs the audit and fails when more than 5% of
indexed URLs are dead.
