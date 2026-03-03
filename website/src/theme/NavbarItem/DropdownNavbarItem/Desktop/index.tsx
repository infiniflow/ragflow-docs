import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import NavbarItem from '@theme/NavbarItem';
import type {Props} from '@theme/NavbarItem/DropdownNavbarItem/Desktop';
import { cn } from '@site/src/utils/twUtils';
import Icon from '@site/src/components/Icon';

export default function DropdownNavbarItemDesktop({
  items,
  dropdownPosition = 'right',
  className,
  wrapperClassName,
  listClassName,
  onClick,
  ...props
}: Props & {
  dropdownPosition?: 'left' | 'right';
  wrapperClassName?: string;
  listClassName?: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent | TouchEvent | FocusEvent,
    ) => {
      if (
        !dropdownRef.current ||
        dropdownRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setShowDropdown(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'group/dropdown',
        'inline-flex relative align-top',
        wrapperClassName,
      )}
    >
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        // # hash permits to make the <a> tag focusable in case no link target
        // See https://github.com/facebook/docusaurus/pull/6003
        // There's probably a better solution though...
        href={props.to ? undefined : '#'}
        className={cn('px-4 py-2 max-desktop:hidden whitespace-nowrap', className)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
      >
        <span>{props.children ?? props.label}</span>
        <Icon icon="LucideChevronDown" className="ml-2" />
      </NavbarNavLink>

      <ul
        className={cn(
          'space-y-2 absolute top-full mb-0 p-2 min-w-32 max-h-[80vh]',
          'bg-standard border border-solid border-component',
          'rounded-md list-none shadow-lg shadow-black/20 -translate-y-2 transition-all',
          'pointer-events-none invisible opacity-0',
          'group-hover/dropdown:visible group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto group-hover/dropdown:translate-y-0',
          dropdownPosition === 'right' ? 'left-0' : 'right-0',
          listClassName,
          showDropdown && 'visible opacity-100 pointer-events-auto',
        )}
      >
        {items.map((childItemProps, i) => (
          <NavbarItem
            key={i}
            isDropdownItem
            className="transition-all"
            activeClassName="text-standard"
            {...childItemProps}
          />
        ))}
      </ul>
    </div>
  );
}
