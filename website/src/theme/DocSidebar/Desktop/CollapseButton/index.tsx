import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import IconArrow from '@theme/Icon/Arrow';
import type {Props} from '@theme/DocSidebar/Desktop/CollapseButton';

import { cn } from '@site/src/utils/twUtils';

export default function CollapseButton({onClick}: Props): ReactNode {
  return (
    <button
      type="button"
      title={translate({
        id: 'theme.docs.sidebar.collapseButtonTitle',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.collapseButtonAriaLabel',
        message: 'Collapse sidebar',
        description: 'The title attribute for collapse button of doc sidebar',
      })}
      className={cn(
        'clear-btn',
        'hidden m-0 text-standard desktop:block',
        'rtl:[&>svg]:rotate-0',
      )}
      onClick={onClick}
    >
      <IconArrow className="rotate-180 mt-1" />
    </button>
  );
}
