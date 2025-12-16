import type { Props as LinkProps } from '@theme/DocSidebarItem/Link';
import type { Props as CategoryProps } from '@theme/DocSidebarItem/Category';

import Icon from '@site/src/components/Icon';
import CATEGORY_ICONS from '@site/src/assets/doc-category-icons.json';

type Props = LinkProps | CategoryProps;

export default function DocCardItemIcon({
  children,
  item,
}: {
  children?: React.ReactNode,
  item: Props['item'],
}) {
  const {
    // customProps: {
    //   sidebarIcon,
    // } = {},
    href: _href,
    label,
  } = item;

  // if (sidebarIcon) {
  //   return <Icon className="flex-none mr-2" icon={sidebarIcon as any} />;
  // }

  const href = _href && `${_href.replace(/^\/docs/, '') || '/'}`;

  if (href && CATEGORY_ICONS[href]) {
    return (
      <Icon
        className="flex-none mr-2"
        icon={CATEGORY_ICONS[href] as any}
      >
        {children}
      </Icon>
    );
  }

  if (label && CATEGORY_ICONS[label]) {
    return (
      <Icon
        className="flex-none mr-2"
        icon={CATEGORY_ICONS[label] as any}
      >
        {children}
      </Icon>
    );
  }

  return children;
};