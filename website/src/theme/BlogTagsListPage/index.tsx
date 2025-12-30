import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import TagsListByLetter from '@theme/TagsListByLetter';
import type { Props } from '@theme/BlogTagsListPage';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';

import { cn } from '@site/src/utils/twUtils';
import Link from '@docusaurus/Link';
import Icon from '@site/src/components/Icon';
import Translate from '@docusaurus/Translate';

export default function BlogTagsListPage({ tags, sidebar }: Props) {
  const title = translateTagsPageTitle();

  return (
    <HtmlClassNameProvider
      className={cn(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}
    >
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <header>
          <nav>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2"
            >
              <Icon icon="LucideArrowLeft" />
              <span>
                <Translate
                  id="blog.post.backToPosts"
                  description="The label of the link back to the posts page"
                >
                  Back to posts
                </Translate>
              </span>
            </Link>
          </nav>

          <Heading as="h1">{title}</Heading>
        </header>
        <TagsListByLetter tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
