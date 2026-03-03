import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostPageMetadata(): ReactNode {
  const { assets, metadata } = useBlogPost();
  const { title, description, date, tags, authors, frontMatter } = metadata;

  const { keywords } = frontMatter;
  const image = assets.image ?? frontMatter.image;

  return (
    <PageMetadata
      title={frontMatter.title_meta ?? title}
      description={description}
      keywords={keywords}
      image={image}>
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {/* See https://ogp.me/#array */}
      {authors.map((author) => (
        <meta
          key={author.key || author.page?.permalink || author.url || author.name}
          property="article:author"
          content={author.name}
        />
      ))}

      {tags.length > 0 && tags.map((tag) => (
        <meta
          key={tag.permalink}
          property="article:tag"
          content={tag.label}
        />
      ))}
    </PageMetadata>
  );
}
