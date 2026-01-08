import { useMemo } from "react";

import { useLocation } from '@docusaurus/router';
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { PageMetadata, usePluralForm } from "@docusaurus/theme-common";
import type { TagModule } from '@docusaurus/utils';

import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';

import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItem from '@theme/BlogPostItem';
import type { Props } from '@theme/BlogPostItems';

import Icon from "@site/src/components/Icon";

interface BlogPostItemsHeaderProps {
  items: readonly { content: PropBlogPostContent }[];
  tag?: TagModule;
}

function BlogPostItemsHeader({
  items,
  tag,
}: BlogPostItemsHeaderProps) {
  const { selectMessage } = usePluralForm();
  const location = useLocation();
  const sp = new URLSearchParams(location.search);
  const searchingYear = sp.get('year');

  const hasFilters = !!searchingYear || !!tag;

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

    const yearTitle = searchingYear
      ? translate(
        {
          id: 'theme.blog.search.year',
          message: 'published in {year}',
          description: 'The year of the search results page',
        },
        {
          year: searchingYear,
        },
      )
      : '';

    const tagTitle = tag ? translate(
      {
        id: 'theme.blog.search.tag',
        message: 'tagged with "{tag}"',
        description: 'The tag of the search results page',
      },
      {
        tag: tag?.label,
      },
    ) : '';

    const title = [
      countTitle,
      yearTitle,
      (yearTitle && tagTitle) ? 'and' : '',
      tagTitle,
    ].filter(Boolean).join(' ');

    return {
      title,
      meta: [
        <PageMetadata title={title} />,
        <SearchMetadata tag="blog_posts_list" />,
      ],
    };
  }, [items.length, searchingYear, tag]);

  if (!hasFilters) {
    return null;
  }

  return (
    <header>
      {meta}

      <h1 className="font-semibold text-lg mb-2">{title}</h1>

      <Link to="/blog">
        <Icon icon="LucideFilterX" />
        <span>
          <Translate
            id="theme.blog.search.clear"
            description="The label of the link clear search filters"
          >
            Clear all filters
          </Translate>
        </span>
      </Link>

      <hr />
    </header>
  );
}

export default function BlogPostItems({
  items,
  tag,
  component: BlogPostItemComponent = BlogPostItem,
}: Props) {
  const searchingYear = new URLSearchParams(useLocation().search).get('year');

  const filteredItems = searchingYear
    ? items.filter((item) => new Date(item.content.metadata.date).getFullYear() === Number(searchingYear))
    : items;

  return (
    <>
      <BlogPostItemsHeader
        items={filteredItems}
        tag={tag}
      />

      <div className="flex flex-col gap-16">
        {filteredItems.map(({ content: BlogPostContent }) => (
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