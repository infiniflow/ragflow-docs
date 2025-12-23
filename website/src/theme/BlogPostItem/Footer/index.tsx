import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';

import { cn } from '@site/src/utils/twUtils';

export default function BlogPostItemFooter() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    // hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;

  // A post is truncated if it's in the "list view" and it has a truncate marker
  // const truncatedPost = !isBlogPostPage && hasTruncateMarker;

  const tagsExists = tags.length > 0;

  // const renderFooter = tagsExists || truncatedPost || editUrl;
  const renderFooter = tagsExists || !isBlogPostPage || editUrl;

  if (!renderFooter) {
    return null;
  }

  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

    return (
      <footer className="mt-12 space-y-4">
        {tagsExists && (
          <div
            className={cn(
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
          >
            <TagsListInline tags={tags} />
          </div>
        )}

        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={cn(
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </footer>
    );
  }
  // BlogPost footer - list view
  else {
    return (
      <footer className="mt-12 flex">
        {tagsExists && (
          <div className="w-3/4">
            <TagsListInline tags={tags} />
          </div>
        )}

        <div
          className={cn(
            'ml-auto text-right',
            tagsExists && 'w-1/4',
          )}
        >
          <ReadMoreLink
            blogPostTitle={title}
            to={metadata.permalink}
          />
        </div>
      </footer>
    );
  }
}
