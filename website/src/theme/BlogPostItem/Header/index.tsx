import React, {type ReactNode} from 'react';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import BlogPostItemHeaderAuthors from '@theme/BlogPostItem/Header/Authors';
import Icon from '@site/src/components/Icon';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function BlogPostItemHeader(): ReactNode {
  const { isBlogPostPage } = useBlogPost();

  return (
    <header className="mb-12">
      {isBlogPostPage && (
        <nav className="mb-4 text-base">
          <Link to="/blog">
            <Icon icon="LucideArrowLeft" />

            <span>
              <Translate
                id="theme.blog.post.backToPosts"
                description="The label of the link back to the posts page"
              >
                Back to posts
              </Translate>
            </span>
          </Link>
        </nav>
      )}

      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}
