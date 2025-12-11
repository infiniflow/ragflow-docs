import type { Props } from '@theme/Navbar/Search';

import { cn } from '@site/src/utils/twUtils';

export default function NavbarSearch({children, className}: Props) {
  return (
    <div className={cn(
      'empty:hidden max-desktop:absolute max-desktop:right-page desktop:px-page',
      className,
    )}>
      {children}
    </div>
  );
}
