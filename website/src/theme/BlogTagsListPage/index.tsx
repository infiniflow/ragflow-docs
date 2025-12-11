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

export default function BlogTagsListPage({tags, sidebar}: Props) {
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
        <Heading as="h1">{title}</Heading>
        <TagsListByLetter tags={tags} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
