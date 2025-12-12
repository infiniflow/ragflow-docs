/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [
    'class',
    '[data-theme="dark"]',
  ],
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{md,mdx}',
    './blog/**/*.{md,mdx}',
    './docusaurus.config.ts',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '577px',
        desktop: '997px',
        '2xl': '1440px',
        '3xl': '1536px',
      },
      // Assign custom Infima variables to Tailwind
      fontFamily: {
        sans: ['var(--ragflow-font-family-base)'],
        mono: ['var(--ragflow-font-family-monospace)'],
      },
      fontSize: {
        heading: 'var(--ragflow-heading-font-size)',
        h1: 'var(--ragflow-h1-font-size)',
        h2: 'var(--ragflow-h2-font-size)',
        h3: 'var(--ragflow-h3-font-size)',
        h4: 'var(--ragflow-h4-font-size)',
        h5: 'var(--ragflow-h5-font-size)',
        h6: 'var(--ragflow-h6-font-size)',
        hero: 'var(--ragflow-hero-font-size)',
      },
      padding: {
        'navbar-height': 'var(--ragflow-navbar-height)',
        leading: 'var(--ifm-leading)',
        page: 'var(--ragflow-page-padding)',
        'page-lg': 'var(--ragflow-page-padding-lg)',
      },
      margin: {
        'navbar-height': 'var(--ragflow-navbar-height)',
        leading: 'var(--ifm-leading)',
        page: 'var(--ragflow-page-padding)',
        'page-lg': 'var(--ragflow-page-padding-lg)',
      },
      width: {
        sidebar: 'var(--ragflow-sidebar-width)',
        'sidebar-hidden': 'var(--ragflow-sidebar-hidden-width)',
      },
      minWidth: {
        sidebar: 'var(--ragflow-sidebar-width)',
        'sidebar-hidden': 'var(--ragflow-sidebar-hidden-width)',
      },
      maxWidth: {
        sidebar: 'var(--ragflow-sidebar-width)',
        'sidebar-hidden': 'var(--ragflow-sidebar-hidden-width)',
      },
      height: {
        navbar: 'var(--ragflow-navbar-height)',
        screen: '100dvh',
      },
      minHeight: {
        navbar: 'var(--ragflow-navbar-height)',
        screen: '100dvh',
      },
      maxHeight: {
        navbar: 'var(--ragflow-navbar-height)',
        screen: '100dvh',
      },
      backgroundColor: {
        standard: 'rgb(var(--ragflow-bg-standard) / <alpha-value>)',
        surface: 'var(--ifm-background-surface-color)',
        'hover-overlay': 'var(--ragflow-hover-overlay)',
      },
      borderWidth: {
        DEFAULT: '0.5px',
        '0.5': '0.5px',
        '1': '1px',
      },
      borderColor: {
        standard: 'var(--ragflow-border-standard)',
        component: 'var(--ragflow-border-component)',
        surface: 'var(--ragflow-bg-surface)',
      },
      textColor: {
        standard: 'rgb(var(--ragflow-text-standard) / <alpha-value>)',
        disabled: 'rgb(var(--ragflow-text-disabled) / <alpha-value>)',
      },
      colors: {
        'theme-white': 'rgba(var(--ragflow-theme-white) / <alpha-value>)',
        'theme-black': 'rgba(var(--ragflow-theme-black) / <alpha-value>)',

        'bg-standard': 'rgb(var(--ragflow-bg-standard) / <alpha-value>)',
        'text-standard': 'rgb(var(--ragflow-text-standard) / <alpha-value>)',

        primary: {
          DEFAULT: 'rgba(var(--ragflow-color-primary) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-primary-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-primary-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-primary-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-primary-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-primary-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-primary-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-primary-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-primary-contrast-background) / <alpha-value>)',
          },
        },
        secondary: {
          DEFAULT: 'rgb(var(--ragflow-color-secondary) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-secondary-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-secondary-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-secondary-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-secondary-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-secondary-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-secondary-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-secondary-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-secondary-contrast-background) / <alpha-value>)',
          },
        },
        info: {
          DEFAULT: 'rgba(var(--ragflow-color-info) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-info-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-info-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-info-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-info-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-info-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-info-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-info-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-info-contrast-background) / <alpha-value>)',
          },
        },
        success: {
          DEFAULT: 'rgba(var(--ragflow-color-success) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-success-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-success-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-success-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-success-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-success-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-success-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-success-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-success-contrast-background) / <alpha-value>)',
          },
        },
        warning: {
          DEFAULT: 'rgba(var(--ragflow-color-warning) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-warning-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-warning-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-warning-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-warning-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-warning-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-warning-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-warning-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-warning-contrast-background) / <alpha-value>)',
          },
        },
        danger: {
          DEFAULT: 'rgba(var(--ragflow-color-danger) / <alpha-value>)',
          lightest: 'rgba(var(--ragflow-color-danger-lightest) / <alpha-value>)',
          lighter: 'rgba(var(--ragflow-color-danger-lighter) / <alpha-value>)',
          light: 'rgba(var(--ragflow-color-danger-light) / <alpha-value>)',
          dark: 'rgba(var(--ragflow-color-danger-dark) / <alpha-value>)',
          darker: 'rgba(var(--ragflow-color-danger-darker) / <alpha-value>)',
          darkest: 'rgba(var(--ragflow-color-danger-darkest) / <alpha-value>)',
          contrast: {
            foreground: 'rgba(var(--ragflow-color-danger-contrast-foreground) / <alpha-value>)',
            background: 'rgba(var(--ragflow-color-danger-contrast-background) / <alpha-value>)',
          },
        },
      },
      gradientColorStops: {
        'border-standard': 'var(--ragflow-border-standard)',
        'border-component': 'var(--ragflow-border-component)',
        'bg-standard': 'rgb(var(--ragflow-bg-standard) / <alpha-value>)',
        'bg-surface': 'var(--ragflow-bg-surface)',
      },
      transitionDuration: {
        fast: 'var(--ifm-transition-fast)',
        slow: 'var(--ifm-transition-slow)',
      },
      transitionTimingFunction: {
        default: 'var(--ifm-transition-timing-default)',
      },
      strokeWidth: {
        '1.5': '1.5',
      },
      zIndex: {
        '1': 1,
        'navbar': 'var(--ragflow-navbar-z-index)',
        'navbar-sidebar-backdrop': 'calc(var(--ragflow-navbar-sidebar-z-index) - 1)',
        'navbar-sidebar': 'var(--ragflow-navbar-sidebar-z-index)',
        'search-overlay': 'var(--ragflow-search-overlay-z-index)',
      },
      inset: {
        page: 'var(--ragflow-page-padding)',
        'navbar-height': 'var(--ragflow-navbar-height)',
        'sidebar-width': 'var(--ragflow-sidebar-width)',
      },
    },
  },
  // Disable preflight to avoid conflicts with Infima/Docusaurus defaults
  corePlugins: {
    preflight: false,
  },
};

