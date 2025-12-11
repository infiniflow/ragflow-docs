import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn leading-none ml-auto p-3"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  return (
    <div className="flex items-center pl-page pr-4 h-navbar">
      <NavbarLogo />
      <NavbarColorModeToggle className="mr-4" />
      <CloseButton />
    </div>
  );
}
