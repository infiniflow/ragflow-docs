import React, { type ReactNode } from 'react';
import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import { useAnnouncementBar } from '@docusaurus/theme-common/internal';
import AnnouncementBarCloseButton from '@theme/AnnouncementBar/CloseButton';
import AnnouncementBarContent from '@theme/AnnouncementBar/Content';

import styles from './styles.module.css';
import { cn } from '@site/src/utils/twUtils';

export default function AnnouncementBar(): ReactNode {
  const { announcementBar } = useThemeConfig();
  const { isActive, close } = useAnnouncementBar();

  if (!isActive) {
    return null;
  }

  const { backgroundColor, textColor, isCloseable } = announcementBar!;

  return (
    <div
      role="banner"
      className={cn(
        ThemeClassNames.announcementBar.container,
        'px-page relative text-base text-standard print:hidden h-10',
        'flex items-center border-0 border-b-1 border-solid border-component',
        'bg-gradient-to-r from-danger/10 via-primary/10 to-warning/10',
        'hover:bg-theme-black/5 focus-within:bg-theme-black/5',
        'transition-[background-color]',
      )}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      <AnnouncementBarContent className="flex-auto py-1" />

      {isCloseable && (
        <AnnouncementBarCloseButton
          onClick={close}
          className="absolute right-0 top-0 bottom-0"
        />
      )}
    </div>
  );
}
