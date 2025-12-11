import React, { type ReactNode } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocSidebarItem/Html';

import { cn } from '@site/src/utils/twUtils';

export default function DocSidebarItemHtml({
  item,
  level,
  index,
}: Props): ReactNode {
  const {value, defaultStyle, className} = item;
  return (
    <li
      className={cn(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        defaultStyle && 'mt-4 py-2',
        className,
      )}
      key={index}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: value}}
    />
  );
}
