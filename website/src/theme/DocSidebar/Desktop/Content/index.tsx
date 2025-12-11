import { useState } from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import {
  useAnnouncementBar,
  useScrollPosition,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar/Desktop/Content';
import SearchBar from '@theme/SearchBar';

import { cn } from '@site/src/utils/twUtils';

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );

  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props) {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <nav
      aria-label={translate({
        id: 'theme.docs.sidebar.navAriaLabel',
        message: 'Docs sidebar',
        description: 'The ARIA label for the sidebar navigation',
      })}
      className={cn(
        'pl-page',
        'desktop:flex-grow desktop:pt-4 desktop:pr-2',
        'supports-[scrollbar-gutter:stable]:pt-4',
        'supports-[scrollbar-gutter:stable]:pr-0',
        'supports-[scrollbar-gutter:stable]:[scrollbar-gutter:stable]',
        showAnnouncementBar && 'mb-[var(--docusaurus-announcement-bar-height)]',
        className,
      )}
    >
      <SearchBar />

      <hr className="my-6" />

      <ul className={cn(
        ThemeClassNames.docs.docSidebarMenu,
        'list-none m-0 p-0',
      )}
      >
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
