import { memo} from 'react';
import { translate } from '@docusaurus/Translate';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type { Props as BlogSidebarContentProps } from '@theme/BlogSidebar/Content';
import type { Props } from '@theme/BlogSidebar/Desktop';

import ScrollArea from '@site/src/components/ScrollArea';

const ListComponent: BlogSidebarContentProps['ListComponent'] = ({items}) => {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName="clean-list m-0 ml-2 py-2 border-0 border-l-1 border-solid border-standard space-y-2"
      liClassName="text-sm"
      linkClassName="-ml-px block pl-4 py-1 text-secondary border-0 border-l-1 border-solid border-transparent"
      linkActiveClassName="-ml-px block pl-4 py-1 text-standard border-0 border-l-1 border-solid border-theme-black"
    />
  );
};

function BlogSidebarDesktop({sidebar}: Props) {
  const items = useVisibleBlogSidebarItems(sidebar.items);

  return (
    <aside className="
      pl-page pt-4 pb-8 flex-none
      w-sidebar h-[calc(100vh-var(--ragflow-navbar-height))]
      sticky top-navbar-height"
    >
      <ScrollArea
        noControls
        scrollHint
        options={{
          suppressScrollX: true,
        }}
      >
        <nav
          aria-label={translate({
            id: 'theme.blog.sidebar.navAriaLabel',
            message: 'Blog recent posts navigation',
            description: 'The ARIA label for recent posts in the blog sidebar',
          })}
        >
          <div className="text-lg font-semibold mb-6">
            {sidebar.title}
          </div>

          <BlogSidebarContent
            items={items}
            ListComponent={ListComponent}
          />
        </nav>
      </ScrollArea>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
