import React, {type ReactNode} from 'react';
import Translate from '@docusaurus/Translate';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';

import { cn } from '@site/src/utils/twUtils';
import ScrollArea from '@site/src/components/ScrollArea';
import Icon from '@site/src/components/Icon';

export default function TOC({className, ...props}: Props): ReactNode {
  return (
    <div
      className={cn(
        '-mb-4 pl-8 pb-4 sticky top-[calc(var(--ragflow-navbar-height)+1rem)]',
        'h-[calc(100vh-var(--ragflow-navbar-height)-1rem)]',
        className,
      )}
    >
      <ScrollArea
        noControls
        scrollHint
        options={{ suppressScrollX: true }}
      >
        <div className="mb-1">
          <Icon icon="LucideLaptop" className="mr-2" />
          <Translate
            id="theme.TOCCollapsible.toggleButtonLabel"
            description="The label used by the button on the collapsible TOC component"
          >
            On this page
          </Translate>
        </div>

        <TOCItems {...props} />
      </ScrollArea>
    </div>
  );
}
