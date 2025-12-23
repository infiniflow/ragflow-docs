import type { Props } from '@theme/BlogPostItem/Container';
import { forwardRef } from 'react';

export default forwardRef<HTMLElement, Props>(function BlogPostItemContainer({
  children,
  className,
}: Props, ref) {
  return <article ref={ref} className={className}>{children}</article>;
});
