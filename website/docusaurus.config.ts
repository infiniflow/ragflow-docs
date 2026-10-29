import fs from 'node:fs';
import { omit } from 'lodash-es';
import path from 'node:path';

import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Options as PluginContentBlogOptions } from '@docusaurus/plugin-content-blog';
import type { Options as PluginContentDocsOptions } from '@docusaurus/plugin-content-docs';
import type { Options as PluginClientRedirectOptions } from '@docusaurus/plugin-client-redirects';

import { GlobExcludeDefault } from '@docusaurus/utils';
import { DEFAULT_OPTIONS as PluginContentDocsDefaultOptions } from '@docusaurus/plugin-content-docs/src/options.js';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';

import versions from './versions.json' with { type: 'json' };
import generatedRedirects from './redirects/generated.json' with { type: 'json' };
import './src/lib/polyfill';

const socialLinks = [
  {
    label: 'Github',
    href: 'https://github.com/infiniflow/ragflow',
    icon: 'SiGithub',
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/NjYzJD3GM3',
    icon: 'SiDiscord',
  },
  {
    label: 'X',
    href: 'https://x.com/infiniflowai',
    icon: 'SiX',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@InfiniFlow-AI',
    icon: 'SiYoutube',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/infiniflow/',
    icon: 'RagLinkedin',
  },
];

const disableVersioning = false;

function getVersions() {
  const versionsMap = {
    current: { label: 'DEV' },

    ...Object.fromEntries(
      (versions as any[]).map((version) => {
        return [version, { label: version.slice(1) }];
      })
    ),
  };

  return disableVersioning ? { current: versionsMap.current } : versionsMap;
}

function versionParts(version: string): number[] {
  return version
    .replace(/^v/, '')
    .split(/[.-]/)
    .map((part) => Number.parseInt(part, 10) || 0);
}

function compareVersionLabels(a: string, b: string): number {
  const left = versionParts(a);
  const right = versionParts(b);

  for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return a.localeCompare(b);
}

// Keep 301s alive for the most recently retired versions only: each version
// multiplies the number of redirect pages generated at build time.
const MAX_RETIRED_VERSION_REDIRECTS = 3;

/**
 * Versions that are no longer built (dropped from versions.json by
 * `scripts/versions/index.js`) but are still linked from search results,
 * inbound links and the Algolia index.
 */
function getRetiredVersions(): string[] {
  const active = new Set(versions as string[]);
  const versionedDocsDir = path.join(process.cwd(), 'versioned_docs');

  if (!fs.existsSync(versionedDocsDir)) {
    return [];
  }

  return fs
    .readdirSync(versionedDocsDir)
    .filter((name) => name.startsWith('version-'))
    .map((name) => name.slice('version-'.length))
    .filter((version) => !active.has(version))
    .sort(compareVersionLabels)
    .reverse()
    .slice(0, MAX_RETIRED_VERSION_REDIRECTS);
}

const retiredVersions = disableVersioning ? [] : getRetiredVersions();

// Growing the versioned paths of an active version into the path of a retired
// one would create nonsense like /docs/v0.27.2/v1.0.0-rc2/...
const ACTIVE_VERSION_PATH = /^\/docs\/v\d/;

// Broken links used to only warn, so renamed/deleted pages shipped silently and
// left dead entries behind in search. `STRICT_LINKS=true` turns them into a
// build error (used by the docs build check).
const strictLinks = process.env.STRICT_LINKS === 'true';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RAGFlow',
  tagline:
    'Build a superior context layer for AI agents - Empower your AI agents through the leading open-source RAG engine, delivering reliable context and an integrated agent platform, built for enterprise.',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#futurexx
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ragflow.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'InfiniFlow', // Usually your GitHub org/user name.
  projectName: 'RAGFlow', // Usually your repo name.

  onBrokenLinks: strictLinks ? 'throw' : 'warn',
  onBrokenAnchors: strictLinks ? 'throw' : 'warn',
  onDuplicateRoutes: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },

    // If any, extract the first image in the post content and write it to the frontmatter `image`
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      const filePath = params.filePath || '';

      const extname = path.extname(filePath);
      const basename = path.basename(filePath);

      // Suppress MDX partial files frontmatter warnings and errors
      if (extname === '.mdx' && basename.startsWith('_')) {
        return {
          ...result,
          frontMatter: {},
        };
      }

      if (!filePath.includes(`${process.cwd()}/blog/`) || result.frontMatter.image) {
        return result;
      }

      const imagePath = params.fileContent.match(/!\[.*?\]\((.*?)\)/)?.[1];

      if (!imagePath) {
        return result;
      }

      // Absolute path - construct absolute URL
      if (imagePath.startsWith('/')) {
        result.frontMatter.image = `${config.url}${imagePath}`;
      }
      // Absolute URL or relative path - use as-is and let Docusaurus resolve it
      else {
        result.frontMatter.image = imagePath;
      }

      return result;
    },
  },

  plugins: [
    // Supports Sass
    'docusaurus-plugin-sass',

    // Supports Tailwind CSS
    './src/plugins/tailwind-plugin',

    // Redirects
    [
      '@docusaurus/plugin-client-redirects',
      {
        // URLs that disappeared since the last sitemap snapshot, generated by
        // `scripts/search/redirects.mjs` during the post-build step.
        redirects: generatedRedirects.redirects ?? [],

        createRedirects: (existingPath) => {
          if (!existingPath.startsWith('/docs')) {
            return undefined;
          }

          const redirectsFrom = new Set<string>([
            existingPath.replace(/^\/docs/, '/docs/dev'),
          ]);

          // Retired versions are deleted from the site on every release, which
          // used to 404 every link bookmarked or indexed under /docs/<version>/.
          // Point them at the same doc in the current version instead.
          if (!ACTIVE_VERSION_PATH.test(existingPath)) {
            const suffix = existingPath.replace(/^\/docs/, '');
            for (const version of retiredVersions) {
              redirectsFrom.add(`/docs/${version}${suffix}`);
            }
          }

          return [...redirectsFrom];
        },
      } satisfies PluginClientRedirectOptions,
    ],

    // Our own enhanced blog plugin
    [
      './src/plugins/blog-plugin',
      {
        path: 'blog',
        routeBasePath: '/blog',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',

        blogSidebarTitle: 'Blog',
        showReadingTime: true,

        // Forced to display all blog posts in blog list
        blogSidebarCount: 'ALL',
        postsPerPage: 'ALL',

        // Disable some pages
        archiveBasePath: null,
      } satisfies PluginContentBlogOptions,
    ],

    // Individual docs for "Basics" category
    [
      '@docusaurus/plugin-content-docs',
      {
        ...PluginContentDocsDefaultOptions,

        id: 'basics',
        path: 'basics',
        routeBasePath: '/basics',
        sidebarPath: './sidebars.ts',
        admonitions: {
          keywords: ['note', 'tip', 'info', 'warning', 'danger'],
        },

        editCurrentVersion: false,
        disableVersioning,
        lastVersion: 'current',
        versions: {
          current: getVersions().current,
        },

        sidebarCollapsed: false,
        sidebarCollapsible: false,
        breadcrumbs: false,
        tags: false,

        sidebarItemsGenerator: async (args) =>
          // Remove the "index" doc from the "Basics" sidebar
          (await args.defaultSidebarItemsGenerator(args)).filter(
            (item) => item.type === 'doc' && item.id !== 'index'
          ),
      } satisfies PluginContentDocsOptions,
    ],

    // Pricing docs
    [
      '@docusaurus/plugin-content-docs',
      {
        ...PluginContentDocsDefaultOptions,

        id: 'pricing',
        path: 'pricing',
        routeBasePath: '/pricing',
        sidebarPath: false,
        admonitions: {
          keywords: ['note', 'tip', 'info', 'warning', 'danger'],
        },
        disableVersioning,
        lastVersion: 'current',
        versions: {
          current: getVersions().current,
        },
        breadcrumbs: false,
        tags: false,
      } satisfies PluginContentDocsOptions,
    ],
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        gtag: {
          trackingID: 'G-CYPZV02X34',
        },

        docs: {
          id: 'default',
          path: 'docs',
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/infiniflow/ragflow/tree/main',
          editCurrentVersion: true,
          lastVersion: 'current',

          // Disable versioning
          disableVersioning,
          versions: getVersions(),

          admonitions: {
            // Discard 'caution' admonition
            keywords: ['note', 'tip', 'info', 'warning', 'danger'],
          },

          exclude: [
            ...GlobExcludeDefault,
            'basics/**/*.{md,mdx}',
            'pricing/**/*.{md,mdx}',
            // "release_notes.{md,mdx}",
          ],
        },

        // Use our own enhanced blog plugin instead of default one
        blog: false,

        pages: {
          admonitions: {
            keywords: ['note', 'tip', 'info', 'warning', 'danger'],
          },
        },

        theme: {
          customCss: [
            // Typefaces
            './src/assets/fonts/Poppins/index.css',
            './src/assets/fonts/Inter/index.css',

            // Tailwind CSS
            './src/css/tailwind.scss',

            // Variables
            './src/css/ragflow-variables.scss',
            './src/css/infima-variables.scss',
            './src/css/docsearch-variables.scss',

            // Perfect scrollbar customization
            './src/css/scrollbar.scss',

            // Custom styles and overrides
            './src/css/custom.scss',

            // Responsive
            './src/css/ragflow-responsive.scss',

            './src/css/legacy-browser.scss',

            // Tailwind CSS legacy browser fallbacks
            './src/css/tailwind-legacy-fallbacks.scss',
          ],
        },

        svgr: {
          svgrConfig: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // Do not cleanup IDs
                      // this causes ID collisions when multiple SVG files are imported in the same page
                      cleanupIds: false,
                    },
                  },
                },
              ],
            },
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Project's social card
    image: 'img/ragflow-social-card.png',

    // Announcement bar at the top of the page
    // announcementBar: {
    //   content: 'This is an announcement bar. <a href="#">See here</a>',
    //   isCloseable: true,
    // },

    // Metadata for Algolia search domain verification
    metadata: [
      {
        name: 'google-site-verification',
        content: 'VRW2WaeBKyASJYDtA71Yoz0BHWgXMiCeQeDefe1fIQc',
      },
      {
        name: 'algolia-site-verification',
        content: '02ADC03A2BCB8D0C',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no',
      },
    ],

    // Algolia search configuration
    algolia: {
      appId: 'XWPHHV7XAR',
      apiKey: 'd278212ab5a570179f9072f7792d7bb9',
      indexName: 'ragflow-docs',
      contextualSearch: true,
      insights: true,
    },

    colorMode: {
      defaultMode: 'dark',

      // Currently forced to dark mode
      // because bright mode hasn't been fine-tuned yet
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    blog: {
      sidebar: {
        groupByYear: true,
      },
    },

    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    navbar: {
      hideOnScroll: false,
      title: 'RAGFlow',
      logo: {
        alt: 'RAGFlow',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
          versions: getVersions(),
        },

        // Left
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Solutions',
          position: 'left',
          items: [
            // {
            //   label: 'Advanced stock research',
            //   icon: 'LucideChartNoAxesCombined',
            //   to: '/solutions/advanced-stock-research',
            // },
            {
              label: 'Financial services',
              icon: 'LucideChartNoAxesCombined',
              to: '/solutions/financial-services',
            },
            {
              label: 'Legal & compliance',
              icon: 'LucideScale',
              to: '/solutions/legal-and-compliance',
            },
            {
              label: 'Manufacturing',
              icon: 'LucideFactory',
              to: '/solutions/manufacturing',
            },
            {
              label: 'Education',
              icon: 'LucideGraduationCap',
              to: '/solutions/education',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Blog',
              to: '/blog',
              icon: 'LucideRss',
            },
            {
              label: 'Basics',
              to: '/basics/what-is-rag',
              icon: 'LucideBookOpen',
            },
            {
              label: 'Changelog',
              to: '/changelog',
              icon: 'LucideClipboardClock',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: socialLinks,
        },
        {
          to: '/#pricing-plan',
          position: 'left',
          label: 'Pricing',
          className: '!text-secondary',
        },

        // Right
        // {
        //   type: "custom-iconLink",
        //   icon: "SiDiscord",
        //   href: "https://github.com/infiniflow/ragflow",
        //   ariaLabel: "Github repository",
        //   position: "right",
        //   mobilePosition: "bottom",
        // },
        {
          type: 'custom-githubStars',
          repo: 'infiniflow/ragflow',
          icon: 'SiGithub',
          position: 'right',
          mobilePosition: 'bottom',
        },

        // Locales dropdown
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          position: 'right',
          label: 'Contact us',
          to: '/contact-us',
        },
      ],
    },

    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} InfiniFlow Inc.<br />All rights reserved.`,

      // Footer columns
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'About RAGFlow',
              to: '/about-service',
            },
            {
              label: 'Documentation',
              to: '/docs',
            },
            {
              label: 'Changelog',
              to: '/changelog',
            },
            {
              label: 'Basics',
              to: '/basics/what-is-rag',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        // {
        //   title: 'Company',
        //   items: [
        // {
        //   label: 'About',
        //   to: '/about',
        // },
        // {
        //   label: 'Careers',
        //   to: '/careers',
        // },
        //   ],
        // },
        {
          title: 'Community',
          items: socialLinks.map((s) => omit(s, 'icon')),
        },
        {
          title: 'TERMS & POLICIES',
          items: [
            {
              label: 'Privacy Policy',
              to: '/policies/privacy',
            },
            {
              label: 'Cookie Policy',
              to: '/policies/cookies',
            },
            {
              label: 'Terms of Use',
              to: '/policies/terms',
            },
            {
              label: 'Data Processing Agreement',
              to: '/policies/dpa',
            },
          ],
        },
      ],
    },

    prism: {
      theme: PrismLight,
      darkTheme: PrismDark,
      additionalLanguages: [
        'java',
        'latex',
        'haskell',
        'matlab',
        'php',
        'powershell',
        'python',
        'bash',
        'diff',
        'json',
        'scss',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
