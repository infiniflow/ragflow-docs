import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type {Props} from '@theme/BlogPostItem';
import { cn } from '@site/src/utils/twUtils';
import { handleForwardedRef } from '@site/src/utils';


export default forwardRef<HTMLElement, Props>(function BlogPostItem({children, className}: Props, ref) {
  const { isBlogPostPage } = useBlogPost();

  const containerRef = useRef<HTMLElement>(null);
  const [firstImageSrc, setFirstImageSrc] = useState<string | null>(null);

  useLayoutEffect(() => {
    // Try grab first image element in the post content as banner image
    // never mind if it's not found
    const containerEl = containerRef.current;

    if (containerEl) {
      const firstImage = containerEl.querySelector('img');

      if (firstImage && firstImage.src) {
        setFirstImageSrc(firstImage.src);
      }
    }
  }, []);

  return (
    <BlogPostItemContainer
      // @ts-ignore
      ref={(r: HTMLElement) => {
        containerRef.current = r;
        handleForwardedRef(r, ref);
      }}
      className={cn(!isBlogPostPage && 'mb-40', className)}
    >
      {/* SEO: attach blog metadata image if is blog post page */}
      {isBlogPostPage && firstImageSrc && <PageMetadata image={firstImageSrc} />}

      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
});