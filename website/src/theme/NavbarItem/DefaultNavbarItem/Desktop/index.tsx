import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem/Desktop';
import { cn } from '@site/src/utils/twUtils';
import Icon, { type IconName } from '@site/src/components/Icon';

export default function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  icon,
  ...props
}: Props & { icon?: IconName }) {
  const element = (
    <NavbarNavLink
      className={cn(
        isDropdownItem
          ? 'px-3 py-2 flex items-center rounded text-sm whitespace-nowrap hover:bg-hover-overlay focus:bg-hover-overlay'
          : 'hidden desktop:inline-block px-4 py-2',
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    >
      {icon && <Icon icon={icon} className="mr-2" />}
      {props.children ?? props.label}
    </NavbarNavLink>
  );

  if (isDropdownItem) {
    return (
      <li>{element}</li>
    );
  }

  return element;
}
