import React, { type ReactNode } from 'react';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/DocRoot/Layout/Main';

import { cn } from '@site/src/utils/twUtils';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): ReactNode {
  const sidebar = useDocsSidebar();

  return (
    <main
      className={cn(
        'flex w-full desktop:flex-grow-1 desktop:max-w-[calc(100%-var(--ragflow-sidebar-width))]',
        (hiddenSidebarContainer || !sidebar) && 'desktop:max-w-[calc(100%-var(--ragflow-sidebar-hidden-width))]',
      )}
    >
      <div
        className={cn(
          'container w-full pt-4 pb-8',
          hiddenSidebarContainer && 'desktop:max-w-[calc(100%-var(--ragflow-sidebar-hidden-width))]',
        )}
      >
        {children}
      </div>
    </main>
  );
}
