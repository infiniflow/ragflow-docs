import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import type { Props } from '@theme/MDXComponents/A';

import { cn } from '@site/src/utils/twUtils';

import IconExternalLink from '@theme/Icon/ExternalLink';

export default function MDXA(props: Props): ReactNode {
  // MDX Footnotes have ids such as <a id="user-content-fn-1-953011" ...>
  const anchorTargetClassName = useAnchorTargetClassName(props.id);

  return (
    <Link
      {...props}
      className={cn(
        anchorTargetClassName,
        props.className,
      )}
    >
      <span>{props.children}</span>

      {props.href && !isInternalUrl(props.href) && <IconExternalLink />}
    </Link>
  );
}
