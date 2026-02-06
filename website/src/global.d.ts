// ----- File Exports -----
module '*.module.scss' {
  export default Record<string, string>;
}

module '*.scss' {
  // No exports for non-module SCSS files
}

module '*.png' {
  export default string;
}

module '*.jpg' {
  export default string;
}

module '*.webp' {
  export default string;
}

module '*.md' {
  import { ComponentType } from 'react';
  import { MDXProps } from 'mdx/types';

  export const frontmatter: Record<string, any>;
  export const contentTitle: string;
  export const toc: Array<{
    value: string;
    id: string;
    level: number;
  }>;

  export default ComponentType<MDXProps>;
}

module '*.mdx' {
  import { ComponentType } from 'react';
  import { MDXProps } from 'mdx/types';

  export const frontmatter: Record<string, any>;
  export const contentTitle: string;
  export const toc: Array<{
    value: string;
    id: string;
    level: number;
  }>;

  export default ComponentType<MDXProps>;
}

// ----- Utility Types -----

type PropsWithAs<P = {}, As extends React.ElementType = any> =
  P
  & { as?: As }
  & Omit<React.ComponentPropsWithoutRef<As>, 'as' | keyof P>;

// ----- Plugin Data Types -----

type GlobalBlogPluginData = {
  blogYears: Record<string, { label: string; items: string[] }>;
  blogTags: import('@docusaurus/plugin-content-blog').BlogTags;
  blogTagsListPath: string;
  authorsMap: Record<string, import('@docusaurus/plugin-content-blog').AuthorItemProp>;
};

// ----- Theme Component Types Override -----

module '@theme/SearchMetadata' {
  export interface Props {
    locale?: string;
    version?: string;
    tag?: string;
    datetime?: string;
  }

  export default function SearchMetadata(props: Props): React.ReactNode;
}

module '@theme/BlogPostItems' {
  import type { TagModule } from '@docusaurus/utils';

  export interface Props {
    items: readonly { content: PropBlogPostContent }[];
    tag?: TagModule;
  }

  export default function BlogPostItems(props: Props): React.ReactNode;
}