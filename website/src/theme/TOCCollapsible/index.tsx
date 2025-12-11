import React, { type ReactNode } from 'react';
import { useCollapsible, Collapsible } from '@docusaurus/theme-common';
import TOCItems from '@theme/TOCItems';
import CollapseButton from '@theme/TOCCollapsible/CollapseButton';
import type { Props } from '@theme/TOCCollapsible';

import { cn } from '@site/src/utils/twUtils';

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): ReactNode {
  const {collapsed, toggleCollapsed} = useCollapsible({
    initialState: true,
  });
  return (
    <div
      className={cn(
        'toc-collapsible overflow-hidden',
        'my-4 bg-surface rounded-md',
        className,
      )}
      aria-expanded={!collapsed}
    >
      <CollapseButton
        collapsed={collapsed}
        onClick={toggleCollapsed}
      />

      <Collapsible
        className="toc-collapsible-content"
        lazy
        collapsed={collapsed}
        animation={{
          duration: 150,
          easing: 'ease-in-out',
        }}
      >
        <div className="px-4">
          <TOCItems
            className="px-0 border-0 border-t-1 border-solid border-standard text-sm"
            toc={toc}
            minHeadingLevel={minHeadingLevel}
            maxHeadingLevel={maxHeadingLevel}
          />
        </div>
      </Collapsible>
    </div>
  );
}
