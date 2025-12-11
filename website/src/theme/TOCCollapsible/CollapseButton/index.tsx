import React, { type ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import type { Props } from '@theme/TOCCollapsible/CollapseButton';

import Icon from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: Props): ReactNode {
  return (
    <button
      type="button"
      {...props}
      aria-expanded={!collapsed}
      className={cn(
        'clean-btn group/collapse-button',
        'px-4 py-2 w-full text-base flex items-center justify-between',
        'hover:bg-hover-overlay focus-visible:bg-hover-overlay',
        props.className,
      )}
    >
      <Translate
        id="theme.TOCCollapsible.toggleButtonLabel"
        description="The label used by the button on the collapsible TOC component"
      >
        On this page
      </Translate>

      <Icon
        className="group-aria-expanded/collapse-button:rotate-90 transition-transform"
        icon="LucideChevronRight"
      />
    </button>
  );
}
