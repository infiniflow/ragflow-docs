import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItem/Header/Title';

import { cn } from '@site/src/utils/twUtils';

export default function BlogPostItemHeaderTitle({className}: Props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title } = metadata;
  return (
    <h1 className={cn('text-heading', className)}>
      {isBlogPostPage
        ? title
        : <Link to={permalink}>{title}</Link>}
    </h1>
  );
}