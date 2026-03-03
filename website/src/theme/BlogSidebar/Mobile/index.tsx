import React, {memo, type ReactNode} from 'react';
import {
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import { NavbarSecondaryMenuFiller } from '@docusaurus/theme-common';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type { Props } from '@theme/BlogSidebar/Mobile';
import type { Props as BlogSidebarContentProps } from '@theme/BlogSidebar/Content';

const ListComponent: BlogSidebarContentProps['ListComponent'] = ({items}) => {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName="clean-list mb-2 ml-2 py-2 border-0 border-l-1 border-solid border-standard space-y-2"
      liClassName="text-sm"
      linkClassName="-ml-px block pl-4 py-1 text-secondary border-0 border-l-1 border-solid border-transparent"
      linkActiveClassName="-ml-px block pl-4 py-1 text-standard border-0 border-l-1 border-solid border-theme-black"
    />
  );
};

function BlogSidebarMobileSecondaryMenu({ sidebar }: Props): ReactNode {
  return (
    <BlogSidebarContent
      items={sidebar.items}
      ListComponent={ListComponent}
    />
  );
}

function BlogSidebarMobile(props: Props): ReactNode {
  return (
    <NavbarSecondaryMenuFiller
      component={BlogSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default memo(BlogSidebarMobile);
