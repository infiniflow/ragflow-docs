import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
// import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import { useLocation } from '@docusaurus/router';

function BlogListPageMetadata(props: Props): ReactNode {
  const { metadata } = props;
  const {
    siteConfig: {
      title: siteTitle
    },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const { metadata, items, sidebar } = props;
  const location = useLocation();
  const sp = new URLSearchParams(location.search);

  const searchingTag = sp.get('tag');
  const searchingYear = sp.get('year');

  const filteredItems = items.filter((item) => {
    const blogTags = item.content.metadata.tags;
    const blogYear = new Date(item.content.metadata.date).getFullYear();

    return (!searchingTag || blogTags?.some((tag) => searchingTag === tag.label))
      && (!searchingYear || blogYear === Number(searchingYear));
  });

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogPostItems items={filteredItems} />
      {/* <BlogListPaginator metadata={metadata} /> */}
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
