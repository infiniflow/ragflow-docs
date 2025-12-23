import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';
import { omit } from 'lodash-es';
import { Options as PluginClientRedirectOptions } from '@docusaurus/plugin-client-redirects';

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
  const versions = {
    current: { label: 'DEV' },
    'v0.22.1': { label: '0.22.1' },
  };

  return disableVersioning
    ? { current: versions.current }
    : versions;
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'RAGFlow',
  tagline: 'Build a superior context layer for AI agents',
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
        createRedirects: (existingPath) => {
          if (existingPath.startsWith('/docs')) {
            return [
              existingPath.replace(/^\/docs/, '/docs/dev'),
            ];
          }
        },
      } satisfies PluginClientRedirectOptions,
    ]
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/infiniflow/ragflow/tree/main',
          editCurrentVersion: true,
          lastVersion: 'current',

          // Disable versioning
          disableVersioning,

          admonitions: {
            // Discard 'caution' admonition
            keywords: ['note', 'tip', 'info', 'warning', 'danger'],
          },

          versions: getVersions(),
        },

        blog: {
          showReadingTime: true,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
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
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Blog',
              to: '/blog',
              icon: 'LucideRss',
            },
            {
              label: 'Changelog',
              to: '/docs/release_notes',
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
              to: '/docs/release_notes',
            }
          ],
        },
        {
          title: 'Company',
          items: [
            // {
            //   label: 'About',
            //   to: '/about',
            // },
            // {
            //   label: 'Careers',
            //   to: '/careers',
            // },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
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
