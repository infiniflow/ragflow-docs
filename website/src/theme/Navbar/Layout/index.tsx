import { createPortal } from 'react-dom';
import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type { Props } from '@theme/Navbar/Layout';

import { cn } from '@site/src/utils/twUtils';
import BrowserOnly from '@docusaurus/BrowserOnly';

function NavbarBackdrop({ hidden, className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      inert={hidden}
      role="presentation"
      {...props}
      className={cn(
        'backdrop',
        'z-navbar-sidebar-backdrop w-screen h-screen fixed inset-0',
        'bg-black/20 backdrop-blur-md opacity-100 visible',
        'transition-[opacity,visibility] duration-200',
        hidden && 'opacity-0 invisible',
        className,
      )}
    />
  );
}

export default function NavbarLayout({children}: Props) {
  const {
    navbar: {
      hideOnScroll,
    },
  } = useThemeConfig();

  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={cn(
        ThemeClassNames.layout.navbar.container,
        'navbar', // Cannot be removed because it is referenced by `useTOCHighlight()` hook
        'z-navbar px-page py-4 sticky top-0 bg-standard/75 backdrop-blur-xl h-navbar',
        hideOnScroll && 'transition-transform ease-[ease]',
        hideOnScroll && !isNavbarVisible && 'translate-y-[calc(-100%-2px)]',
      )}
    >
      {children}

      <BrowserOnly>
        {() => createPortal(
          (
            <div>
              <NavbarBackdrop onClick={mobileSidebar.toggle} hidden={!mobileSidebar.shown} />
              <NavbarMobileSidebar />
            </div>
          ),
          window.document.body,
          'sidebar-drawer',
        )}
      </BrowserOnly>
    </nav>
  );
}
