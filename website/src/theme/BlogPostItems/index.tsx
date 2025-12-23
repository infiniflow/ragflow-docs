import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';

import BlogPostItem from '@theme/BlogPostItem';
import type { Props } from '@theme/BlogPostItems';
import { useLayoutEffect, useRef } from 'react';

/*
function BlogPostItemContentSniffer({
  children,
  content: BlogPostContent,
  component: BlogPostItemComponent = BlogPostItem,
}: {
  children: React.ReactNode,
  content: PropBlogPostContent
} & Omit<Props, 'items'>) {
  // TODO: get the first image of the blog post and set it as the banner image
  const itemRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const itemEl = itemRef.current;

    if (itemEl) {
      const firstImage = itemEl.querySelector('img');
    }
  }, []);

  return (
    <BlogPostProvider content={BlogPostContent}>
      <BlogPostItemComponent
        // @ts-ignore
        ref={itemRef}
      >
        {children}
      </BlogPostItemComponent>
    </BlogPostProvider>
  );
};

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}: Props) {
  return (
    <>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostItemContentSniffer
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}
          component={BlogPostItemComponent}
        >
          <BlogPostContent />
        </BlogPostItemContentSniffer>
      ))}
    </>
  );
}
*/

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}: Props) {
  return (
    <>
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
    </>
  );
}