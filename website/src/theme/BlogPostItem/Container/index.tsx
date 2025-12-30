import type { Props } from '@theme/BlogPostItem/Container';

export default function BlogPostItemContainer({
  children,
  className,
}: Props) {
  return <article className={className}>{children}</article>;
};
