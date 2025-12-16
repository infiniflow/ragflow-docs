import type { Props as LinkProps } from '@theme/DocSidebarItem/Link';
import type { Props as CategoryProps } from '@theme/DocSidebarItem/Category';

import Icon from '@site/src/components/Icon';
import SIDEBAR_ICONS from '@site/src/assets/doc-sidebar-icons.json';

type Props = LinkProps | CategoryProps;

export default function DocSidebarItemIcon({ item }: { item: Props['item'] }) {
  const {
    // customProps: {
    //   sidebarIcon,
    // } = {},
    href: _href,
  } = item;

  // if (sidebarIcon) {
  //   return <Icon className="flex-none mr-2" icon={sidebarIcon as any} />;
  // }

  const href = _href && `${_href.replace(/^\/docs/, '') || '/'}`;

  if (href && SIDEBAR_ICONS[href]) {
    return <Icon className="flex-none mr-2" icon={SIDEBAR_ICONS[href] as any} />;
  }

  return null;
};