import React, {type ReactNode} from 'react';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import IconMenu from '@theme/Icon/Menu';

export default function MobileSidebarToggle(): ReactNode {
  const { toggle, shown } = useNavbarMobileSidebar();

  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description:
          'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      className="
        navbar-toggle clean-btn
        desktop:hidden p-3
        text-base leading-none flex items-center justify-center
        rounded transition-colors
        hover:bg-hover-overlay focus-visible:bg-hover-overlay"
      type="button"
    >
      <IconMenu />
    </button>
  );
}
