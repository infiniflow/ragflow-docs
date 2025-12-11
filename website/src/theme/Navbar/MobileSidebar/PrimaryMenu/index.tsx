import { partition } from 'lodash-es';

import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import ScrollArea from '@site/src/components/ScrollArea';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as (NavbarItemConfig & { mobilePosition?: 'bottom' })[];
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();

  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const [bottomItems, items] = partition(useNavbarItems(), (item) => item.mobilePosition === 'bottom');

  const listEl = (
    <ul className="w-full m-0 p-0 list-none">
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );

  if (!bottomItems.length) {
    return listEl;
  }

  return (
    <div className="py-4 size-full flex flex-col">
      <ScrollArea
        className="flex-1 h-0"
        scrollHint
        options={{
          suppressScrollX: true,
          scrollYMarginOffset: 1,
        }}
      >
        <div className="px-page">
          {listEl}
        </div>
      </ScrollArea>

      <div className="px-page mt-auto">
        <hr />

        <ul className="
          flex items-center justify-end
          m-0 p-0 -ml-px py-2 list-none"
        >
          {bottomItems.map((item, i) => (
            <NavbarItem mobile key={i} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
