import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogAuthor from '@theme/Blog/Components/Author';
import type { Props } from '@theme/BlogPostItem/Header/Authors';
import { cn } from '@site/src/utils/twUtils';

// Component responsible for the authors layout
export default function BlogPostItemHeaderAuthors({
  className,
}: Props) {
  const {
    metadata: { authors },
    assets,
  } = useBlogPost();
  const authorsCount = authors.length;

  if (authorsCount === 0) {
    return null;
  }

  const imageOnly = authors.every(({name}) => !name);
  const singleAuthor = authors.length === 1;

  return (
    <div
      className={cn(
        'mt-8 mb-4',
        imageOnly || singleAuthor
          ? 'flex flex-row flex-wrap gap-2'
          : 'grid grid-cols-2 gap-2',
        className,
      )}>
      {authors.map((author, idx) => (
        <div key={idx}>
          <BlogAuthor
            author={{
              ...author,
              // Handle author images using relative paths
              imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
            }}
          />
        </div>
      ))}
    </div>
  );
}
