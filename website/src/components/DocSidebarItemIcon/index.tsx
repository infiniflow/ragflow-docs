import {
  useActiveDocContext,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';

import type { Props as LinkProps } from '@theme/DocSidebarItem/Link';
import type { Props as CategoryProps } from '@theme/DocSidebarItem/Category';

import Icon from '@site/src/components/Icon';
import SIDEBAR_ICONS from '@site/src/assets/doc-sidebar-icons.json';

type Props = LinkProps | CategoryProps;

export default function DocSidebarItemIcon({ item }: { item: Props['item'] }) {
  const {
    customProps: {
      sidebarIcon,
    } = {},
    href: _href,
  } = item;

  const activeDocContext = useActiveDocContext('default');

  // Respect the custom sidebar icon if provided
  if (sidebarIcon) {
    return (
      <Icon
        className="flex-none mr-2"
        icon={sidebarIcon as any}
      />
    );
  }

  // const href = _href && `/${activeDocContext.activeDoc?.path ? _href.replace(activeDocContext.activeDoc.path, '') : ''}`;

  // if (href && SIDEBAR_ICONS[href]) {
  //   return <Icon className="flex-none mr-2" icon={SIDEBAR_ICONS[href] as any} />;
  // }

  return null;
};