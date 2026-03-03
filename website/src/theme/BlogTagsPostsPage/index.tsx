import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import type {Props} from '@theme/BlogTagsPostsPage';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';

import { cn } from '@site/src/utils/twUtils';

export default function BlogTagsPostsPage({
  items,
  // listMetadata,
  sidebar,
  tag,
}: Props) {
  return (
    <HtmlClassNameProvider
      className={cn(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <BlogLayout sidebar={sidebar}>
        {tag.unlisted && <Unlisted />}

        <BlogPostItems items={items} tag={tag} />
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
