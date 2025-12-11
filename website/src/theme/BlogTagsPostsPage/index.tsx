import Translate from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogTagsPostsPage';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';
import { cn } from '@site/src/utils/twUtils';
import Icon from '@site/src/components/Icon';

export default function BlogTagsPostsPage({
  items,
  listMetadata,
  sidebar,
  tag
}: Props) {
  const title = useBlogTagsPostsPageTitle(tag);

  return (
    <HtmlClassNameProvider
      className={cn(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />

      <BlogLayout sidebar={sidebar}>
        {tag.unlisted && <Unlisted />}
        <header className="mb-24">
          <Heading as="h1">{title}</Heading>
          {tag.description && <p>{tag.description}</p>}
          <Link
            href={tag.allTagsPath}
            className="text-primary hover:text-primary-dark focus-visible:text-primary-dark"
          >
            <span>
              <Translate
                id="theme.tags.tagsPageLink"
                description="The label of the link targeting the tag list page"
              >
                View All Tags
              </Translate>
            </span>

            <Icon icon="LucideArrowRight" />
          </Link>
        </header>

        <BlogPostItems items={items} />
        <BlogListPaginator metadata={listMetadata} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
