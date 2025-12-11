import React, { useEffect, type ReactNode, type ComponentProps } from 'react';
import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
} from '@docusaurus/theme-common';
import { isSamePath, useLocalPathname } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem, { type LinkLikeNavbarItemProps} from '@theme/NavbarItem';
import type { Props } from '@theme/NavbarItem/DropdownNavbarItem/Mobile';
import { cn } from '@site/src/utils/twUtils';
import Icon from '@site/src/components/Icon';

function isItemActive(
  item: LinkLikeNavbarItemProps,
  localPathname: string,
): boolean {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}

function containsActiveItems(
  items: readonly LinkLikeNavbarItemProps[],
  localPathname: string,
): boolean {
  return items.some((item) => isItemActive(item, localPathname));
}

function useItemCollapsible({active}: {active: boolean}) {
  const {collapsed, toggleCollapsed, setCollapsed} = useCollapsible({
    initialState: () => !active,
  });

  // Expand if any item active after a navigation
  useEffect(() => {
    if (active) {
      setCollapsed(false);
    }
  }, [active, setCollapsed]);

  return {
    collapsed,
    toggleCollapsed,
  };
}

export default function DropdownNavbarItemMobile({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  ...props
}: Props): ReactNode {
  const localPathname = useLocalPathname();
  const isActive = isSamePath(props.to, localPathname);
  const containsActive = containsActiveItems(items, localPathname);

  const {collapsed, toggleCollapsed} = useItemCollapsible({
    active: isActive || containsActive,
  });

  // # hash permits to make the <a> tag focusable in case no link target
  // See https://github.com/facebook/docusaurus/pull/6003
  // There's probably a better solution though...
  const href = props.to ? undefined : '#';

  return (
    <li
      className={cn('mt-4 first:mt-0',
        collapsed && 'menu__list-item--collapsed',
      )}
    >
      <div
        className={cn(
          'w-full relative',
          isActive && 'menu__list-item-collapsible--active',
        )}
      >
        <NavbarNavLink
          role="button"
          className={cn(
            'flex items-center cursor-pointer py-2 leading-tight',
            className,
          )}
          href={href}
          aria-expanded={!collapsed}
          {...props}
          onClick={(e) => {
            // Prevent navigation when link is "#"
            if (href === '#') {
              e.preventDefault();
            }
            // Otherwise we let navigation eventually happen, and/or collapse
            toggleCollapsed();
          }}
        >
          <span className="mr-auto">{props.children ?? props.label}</span>

          <Icon
            className={cn(
              'ml-auto transition-transform',
              collapsed ? 'rotate-0' : 'rotate-90',
            )}
            icon="LucideChevronRight"
          />
        </NavbarNavLink>
      </div>

      <div className="ml-2 border-0 border-solid border-l-1 border-standard">
        <Collapsible
          lazy
          as="ul"
          className="list-none block m-0 p-0 mt-2 py-2 -ml-px pl-[var(--ragflow-sidebar-nesting-padding)]"
          collapsed={collapsed}
        >
          {items.map((childItemProps, i) => (
            <NavbarItem
              key={i}
              mobile
              isDropdownItem
              onClick={onClick}
              activeClassName="text-standard"
              {...childItemProps}
            />
          ))}
        </Collapsible>
      </div>
    </li>
  );
}
