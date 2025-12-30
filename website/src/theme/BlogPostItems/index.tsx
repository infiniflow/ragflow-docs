import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import { useLocation } from '@docusaurus/router';
import Translate, { translate } from '@docusaurus/Translate';
import { PageMetadata, usePluralForm } from '@docusaurus/theme-common';

import BlogPostItem from '@theme/BlogPostItem';
import type { Props } from '@theme/BlogPostItems';
import { useMemo } from 'react';
import Icon from '@site/src/components/Icon';
import Link from '@docusaurus/Link';
import SearchMetadata from '../SearchMetadata';

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}: Props) {
  const location = useLocation();
  const sp = new URLSearchParams(location.search);
  const searchingTag = sp.get('tag');
  const searchingYear = sp.get('year');

  const hasSearch = !!location.search;

  const { selectMessage } = usePluralForm();

  const { title, meta } = useMemo(() => {
    const countTitle = selectMessage(
      items.length,
      translate(
        {
          id: 'theme.blog.search.count',
          message: 'One post|{count} posts',
          description: 'The posts count of the search results page',
        },
        {
          count: items.length,
        },
      ),
    );

    const yearTitle = translate(
      {
        id: 'theme.blog.search.year',
        message: 'published in {year}',
        description: 'The year of the search results page',
      },
      {
        year: searchingYear,
      },
    );

    const tagTitle = translate(
      {
        id: 'blog.search.tag',
        message: 'tagged with "{tag}"',
        description: 'The tag of the search results page',
      },
      {
        tag: searchingTag,
      }
    );

    const title = [
      countTitle,
      searchingYear && yearTitle,
      searchingTag && tagTitle,
    ].filter(Boolean).join(' ');

    return {
      title,
      meta: [
        <PageMetadata title={title} />,
        <SearchMetadata tag="blog_posts_list" />,
      ],
    };
  }, [items.length, searchingYear, searchingTag]);

  return (
    <>
      {hasSearch && (
        <header className="mb-12">
          {meta}

          <h1 className="text-lg mb-2">{title}</h1>

          <Link to={location.pathname}>
            <Icon icon="LucideFilterX" />
            <span>
              <Translate
                id="blog.search.clear"
                description="The label of the link clear search filters"
              >
                Clear all filters
              </Translate>
            </span>
          </Link>

          <hr />
        </header>
      )}

      <div className="flex flex-col gap-16">
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}
          >
            <BlogPostItemComponent>
              <BlogPostContent />
            </BlogPostItemComponent>
          </BlogPostProvider>
        ))}
      </div>
    </>
  );
}