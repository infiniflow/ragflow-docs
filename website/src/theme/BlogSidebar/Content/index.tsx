import React, {memo, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogSidebar/Content';

function BlogSidebarYearGroup({
  year,
  children,
}: {
  year: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      className="mb-4 last:mb-0"
    >
      <Heading as="h3" className="mb-2">
        {year}
      </Heading>

      {children}
    </div>
  );
}

function BlogSidebarContent({
  items,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();
  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYear = groupBlogSidebarItemsByYear(items);
    return (
      <>
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarYearGroup
            key={year}
            year={year}
          >
            <ListComponent items={yearItems} />
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  } else {
    return <ListComponent items={items} />;
  }
}

export default memo(BlogSidebarContent);
