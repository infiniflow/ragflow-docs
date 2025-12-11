import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import type { Props } from '@theme/DocSidebar/Desktop';
import { cn } from '@site/src/utils/twUtils';

import ScrollArea from '@site/src/components/ScrollArea';

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={cn(
        'desktop:flex desktop:flex-col desktop:h-full',
        'pb-8 desktop:pt-navbar-height desktop:w-sidebar',
        hideOnScroll && 'desktop:!pt-0',
        isHidden && 'desktop:opacity-0 desktop:invisible',
      )}
    >
      <ScrollArea
        noControls
        scrollHint
        options={{
          suppressScrollX: true,
        }}
      >
        {hideOnScroll && (
          <div className="
            hidden
            desktop:flex desktop:items-center desktop:mx-page
            desktop:min-h-navbar desktop:max-h-navbar
            desktop:color-inherit desktop:text-decoration-none
          ">
            <Logo tabIndex={-1} />
          </div>
        )}

        <Content path={path} sidebar={sidebar} />

        {hideable && <CollapseButton onClick={onCollapse} />}
      </ScrollArea>
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
