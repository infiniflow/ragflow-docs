import React, {type ReactNode} from 'react';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import Icon, { type Props as IconProps } from '@site/src/components/Icon';
import { cn } from '@site/src/utils/twUtils';

interface Props {
  href: string;
  icon: IconProps['icon'];
  className?: string;
}

export default function IconLinkNavbarItem({
  href,
  icon,
  className,
}: Props): ReactNode {
  return (
    <NavbarNavLink
      className={cn('p-3 mx-2', className)}
      href={href}
    >
      <Icon icon={icon} />
    </NavbarNavLink>
  );
}
