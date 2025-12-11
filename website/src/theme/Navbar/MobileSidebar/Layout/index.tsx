import React, { type ReactNode } from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';
import { cn } from '@site/src/utils/twUtils';
import ScrollArea from '@site/src/components/ScrollArea';

function NavbarMobileSidebarPanel({
  children,
  inert,
}: {
  children: ReactNode;
  inert: boolean;
}) {
  return (
    <div
      className={cn(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'size-full flex-none',
      )}
      inert={inert}
    >
      {children}
    </div>
  );
}

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): ReactNode {
  const {
    shown: secondaryMenuShown,
  } = useNavbarSecondaryMenu();

  return (
    <div
      className={cn(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'z-navbar-sidebar h-screen fixed top-0 bottom-0 left-0 w-[83vw]',
        'overflow-hidden invisible bg-standard -translate-x-full',
        'transition-[transform,visibility] duration-200 ease-[cubic-bezier(0,.85,.1,.97)]',
      )}
    >
      {header}

      <div
        className={cn(
          'flex h-[calc(100%-var(--ragflow-navbar-height))]',
          'transition-transform will-change-transform',
          secondaryMenuShown && '-translate-x-full',
        )}
      >
        <NavbarMobileSidebarPanel inert={secondaryMenuShown}>
          {primaryMenu}
        </NavbarMobileSidebarPanel>

        <NavbarMobileSidebarPanel inert={!secondaryMenuShown}>
          {secondaryMenu}
        </NavbarMobileSidebarPanel>
      </div>
    </div>
  );
}
