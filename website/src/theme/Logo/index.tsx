import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, type NavbarLogo } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import type { Props } from '@theme/Logo';
import { cn } from '@site/src/utils/twUtils';

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );

  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}

export default function Logo(props: Props): ReactNode {
  const {
    siteConfig: {title},
  } = useDocusaurusContext();
  const {
    navbar: {
      title: navbarTitle,
      logo,
    },
  } = useThemeConfig();

  const {
    className,
    imageClassName,
    titleClassName,
    ...propsRest
  } = props;

  const logoLink = useBaseUrl(logo?.href || '/');

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? '' : title;

  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      className={cn('flex items-center', className)}
      {...propsRest}
      {...(logo?.target && {target: logo.target})}
    >
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={cn('flex-none h-8 mr-3', imageClassName)}
        />
      )}

      {navbarTitle != null && (
        <b className={cn(
          'text-standard text-xl flex-auto overflow-hidden whitespace-nowrap text-ellipsis',
          titleClassName,
        )}>
          {navbarTitle}
        </b>
      )}
    </Link>
  );
}
