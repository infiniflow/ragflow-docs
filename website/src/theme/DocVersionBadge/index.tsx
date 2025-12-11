import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocVersionBadge';
import { cn } from '@site/src/utils/twUtils';

export default function DocVersionBadge({className}: Props): ReactNode {
  const versionMetadata = useDocsVersion();

  if (versionMetadata.badge) {
    return (
      <span
        className={cn(
          ThemeClassNames.docs.docVersionBadge,
          'inline-block mb-2 px-3 py-1.5 leading-none text-sm rounded-full',
          'text-secondary-contrast-foreground bg-secondary-contrast-background dark:bg-secondary-darkest',
          className,
        )}
      >
        <Translate
          id="theme.docs.versionBadge.label"
          values={{ versionLabel: versionMetadata.label }}
        >
          {'Version: {versionLabel}'}
        </Translate>
      </span>
    );
  }
  return null;
}
