import React, { type ReactNode } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/Footer/Layout';
import { cn } from '@site/src/utils/twUtils';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={cn(
        ThemeClassNames.layout.footer.container,
        'border-0 border-t border-solid border-component px-page pt-28 pb-16',
      )}
    >
      <div className="flex flex-wrap flex-col desktop:flex-row desktop:flex-nowrap items-stretch">
        {(logo || copyright) && (
          <div className="max-desktop:mt-16 max-desktop:order-last max-desktop:text-center desktop:mr-auto flex-none">
            {logo && <div className="mb-12">{logo}</div>}
            {copyright}
          </div>
        )}

        <div className="p-0 max-desktop:px-page max-desktop:w-full desktop:container desktop:ml-40">
          {links}
        </div>
      </div>
    </footer>
  );
}
