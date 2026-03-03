import { Children, isValidElement } from 'react';
import { MDXProps } from 'mdx/types';

import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import type {Props} from '@theme/BlogPostItem';
import MDXComponents from '@theme/MDXComponents';

import { cn } from '@site/src/utils/twUtils';

type ChildProps = MDXProps &{ children: ChildElement | ChildElement[] };
type ChildElement = React.ReactElement<ChildProps>;

function findFirstImageElement(node: React.ReactElement<ChildProps>): React.ReactElement<ChildProps> {
  const children = Children
  .toArray(node.props.children)
  .filter(isValidElement<ChildProps>);

  if (!children.length) {
    return;
  }

  for (const child of children) {
    if (child.type === 'img' || child.type === MDXComponents.img) {
      return child;
    }

    const image = findFirstImageElement(child);

    if (image) {
      return image;
    }
  }
}

function useBlogPostContentFirstImage(el: any) {
  const { assets, metadata } = useBlogPost();

  // Directly using the image from the assets
  if (assets.image) {
    return assets.image;
  }

  // Otherwise, find the first image element in the content
  const node = el.type(el.props);
  const imgEl = findFirstImageElement(node);

  return imgEl?.props.src as string;
}

function BlogPostItemCard({ children }: Props) {
  const {
    metadata,
  } = useBlogPost();

  const imgSrc = useBlogPostContentFirstImage(children);

  return (
    <Link
      to={metadata.permalink}
      className="group/card block no-underline"
    >
      <article className="
        relative p-4 flex flex-col desktop:flex-row gap-4 desktop:gap-8 transition-colors
        rounded-2xl border border-solid border-component overflow-hidden
        group-hover/card:border-standard group-focus-visible/card:border-standard group-focus/card:border-standard
        before:content-[''] before:absolute before:inset-0 before:-z-1 before:transition-opacity
        before:bg-gradient-to-r before:from-transparent before:to-theme-black/5 before:opacity-0
        group-hover/card:before:opacity-100 group-focus-visible/card:opacity-100"
      >
        <header className={cn(imgSrc ? 'desktop:basis-3/5' : 'desktop:basis-full')}>
          <BlogPostItemHeaderInfo className="text-xs mt-1 text-disabled" />
          <h1 className="m-0 mt-2 text-xl desktop:text-2xl group-hover/card:text-primary transition-colors">{metadata.title}</h1>
        </header>

        {imgSrc && (
          <div className="max-desktop:-order-1 desktop:basis-2/5 rounded-lg overflow-hidden">
            <img
              src={imgSrc}
              alt={metadata.title}
              className="block w-full h-auto rounded-lg transition-transform ease-out duration-300 group-hover/card:scale-105"
            />
          </div>
        )}
      </article>
    </Link>
  );
};

export default function BlogPostItem({children, className}: Props) {
  const { isBlogPostPage } = useBlogPost();

  return isBlogPostPage
    ? (
      <BlogPostItemContainer className={className}>
        <BlogPostItemHeader />
        <BlogPostItemContent>{children}</BlogPostItemContent>
      </BlogPostItemContainer>
    )
    : (
      <BlogPostItemCard className={className}>
        {children}
      </BlogPostItemCard>
    )
};