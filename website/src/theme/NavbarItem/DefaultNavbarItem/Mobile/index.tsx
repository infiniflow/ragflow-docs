import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import type {Props} from '@theme/NavbarItem/DefaultNavbarItem/Mobile';
import { cn } from '@site/src/utils/twUtils';
import Icon, { type IconName } from '@site/src/components/Icon';

export default function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  icon,
  ...props
}: Props & { icon?: IconName }) {
  return (
    <li className="mt-4 first:mt-0">
      <NavbarNavLink
        className={cn('leading-tight block py-2', className)}
        {...props}
      >
        {icon && <Icon icon={icon} className="mr-2" />}
        {props.children ?? props.label}
      </NavbarNavLink>
    </li>
  );
}
