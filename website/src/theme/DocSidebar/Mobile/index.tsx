import React from 'react';
import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar/Mobile';
import SearchBar from '@theme/SearchBar';
import { cn } from '@site/src/utils/twUtils';


// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}) => {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <>
      <div className="mt-2 mb-8">
        <SearchBar />
      </div>

      <ul className={cn(ThemeClassNames.docs.docSidebarMenu, 'w-full m-0 p-0 list-none')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (
              (item.type === 'category' && item.href)
              || item.type === 'link'
            ) {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
