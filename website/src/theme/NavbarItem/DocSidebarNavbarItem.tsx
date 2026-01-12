import React, { type ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import {
  useActiveDocContext,
  useDocsData,
  useLayoutDocsSidebar,
} from '@docusaurus/plugin-content-docs/client';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DocSidebarNavbarItem';

export default function DocSidebarNavbarItem({
  sidebarId,
  label,
  docsPluginId,
  ...props
}: Props): ReactNode {
  const { pathname } = useLocation();
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const sidebarLink = useLayoutDocsSidebar(sidebarId, docsPluginId).link;

  const { path: docsPath } = useDocsData(docsPluginId);
  const isDocsPage = pathname.startsWith(docsPath);

  if (!sidebarLink) {
    throw new Error(
      `DocSidebarNavbarItem: Sidebar with ID "${sidebarId}" doesn't have anything to be linked to.`,
    );
  }
  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() => activeDoc?.sidebar === sidebarId}
      label={label ?? sidebarLink.label}
      // Always navigate to the main version docs page if not at the docs page
      to={isDocsPage ? sidebarLink.path : docsPath}
    />
  );
}
