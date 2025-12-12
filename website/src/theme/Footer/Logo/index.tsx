import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';

import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import type { Props } from '@theme/Footer/Logo';
import { cn } from '@site/src/utils/twUtils';

function LogoImage({ logo, className }: Props & { className?: string }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const sources = {
    light: withBaseUrl(logo.src),
    dark: withBaseUrl(logo.srcDark ?? logo.src),
  };

  return (
    <ThemedImage
      className={cn(logo.className, className)}
      alt={logo.alt}
      sources={sources}
      width={logo.width}
      height={logo.height}
      style={logo.style}
    />
  );
}

export default function FooterLogo({ logo }: Props) {
  const {
    navbar: {
      title,
    },
  } = useThemeConfig();

  const logoEl = (
    <div className="desktop:flex desktop:items-center">
      <LogoImage
        logo={logo}
        className="block size-12 max-desktop:mx-auto desktop:mr-3"
      />

      {title && (
        <div className="
          max-desktop:mt-4 text-3xl text-bg-standard font-bold
          [paint-order:stroke] [-webkit-text-stroke:2px_rgb(var(--ragflow-color-secondary))]
        ">
          <span className="group/title max-desktop:px-2">
            {title.split('').map((char, index) => (
              <span
                key={index}
                className="transition-colors group-hover/title:text-standard"
                style={{
                  transitionDelay: `${index * 10}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );

  return logo.href ? (
    <Link
      href={logo.href}
      className="opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100"
      target={logo.target}
    >
      {logoEl}
    </Link>
  ) : logoEl;
}
