import React, { type ReactNode, useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
  type TOCHighlightConfig,
} from '@docusaurus/theme-common/internal';
import TOCItemTree from '@theme/TOCItems/Tree';
import type {Props} from '@theme/TOCItems';
import { cn } from '@site/src/utils/twUtils';

export default function TOCItems({
  toc,
  className,
  // Required by settings in `useTOCHighlight()` to work
  linkClassName = 'toc-item__link',
  linkActiveClassName = 'text-standard',
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: Props): ReactNode {
  const themeConfig = useThemeConfig();

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }

    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);

  useTOCHighlight(tocHighlightConfig);

  return (
    <TOCItemTree
      toc={tocTree}
      className={cn('table-of-contents', className)}
      linkClassName={linkClassName}
      {...props}
    />
  );
}
