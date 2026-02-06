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
        return [
          version,
          { label: version.slice(1) },
        ];
      })
    ),
  };

  return disableVersioning
    ? { current: versionsMap.current }
    : versionsMap;
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RAGFlow',
  tagline: 'Build a superior context layer for AI agents - Empower your AI agents through the leading open-source RAG engine, delivering reliable context and an integrated agent platform, built for enterprise.',
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

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
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
    ['@docusaurus/plugin-client-redirects', {
      createRedirects: (existingPath) => {
        if (existingPath.startsWith('/docs')) {
          return [existingPath.replace(/^\/docs/, '/docs/dev')];
        }
      },
    } satisfies PluginClientRedirectOptions],

    // Our own enhanced blog plugin
    ['./src/plugins/blog-plugin', {
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
    } satisfies PluginContentBlogOptions],

    // Individual docs for "Basics" category
    ['@docusaurus/plugin-content-docs', {
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

      sidebarItemsGenerator: async (args) => (
        // Remove the "index" doc from the "Basics" sidebar
        (await args.defaultSidebarItemsGenerator(args))
          .filter((item) => item.type === 'doc' && item.id !== 'index')
      ),
    } satisfies PluginContentDocsOptions],
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
            'release_notes.{md,mdx}',
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
        content: 'vV1cl_RlTBIzTmiZLc022i_FJpoURZBVvJIdg4GDLGw',
      },
      {
        name: 'algolia-site-verification',
        content: '02ADC03A2BCB8D0C',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no',
      }
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

        // Right
        {
          type: 'custom-iconLink',
          icon: 'SiDiscord',
          href: 'https://github.com/infiniflow/ragflow',
          ariaLabel: "Github repository",
          position: 'right',
          mobilePosition: 'bottom',
        },
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
      copyright: `Copyright © ${new Date().getFullYear()} InfiniFlow.<br />All rights reserved.`,

      // Footer columns
      links: [
        {
          title: 'Resources',
          items: [
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
