import type { Props } from '@theme/MDXComponents/Ul';

export default function MDXUl(props: Props) {
  return <ul {...props} className={props.className} />;
}
