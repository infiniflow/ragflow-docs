import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';
import Icon from '@site/src/components/Icon';
import ScrollArea from '@site/src/components/ScrollArea';

function SecondaryMenuBackButton(props: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type="button"
      className="
        clean-btn flex items-center
        relative w-full mb-2 py-2 text-base
        hover:text-standard focus:text-standard
      "
    >
      <Icon className="mr-2" icon="LucideArrowLeft" />

      <span>
        <Translate
          id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
          description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)"
        >
          Back to main menu
        </Translate>
      </span>
    </button>
  );
}

// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu() {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const secondaryMenu = useNavbarSecondaryMenu();

  return (
    <div className="size-full flex flex-col">
      {/* edge-case: prevent returning to the primaryMenu when it's empty */}
      {!isPrimaryMenuEmpty && (
        <div className="flex-none px-page pt-4">
          <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
          <hr />
        </div>
      )}

      <ScrollArea
        className="flex-1 h-0"
        scrollHint
        options={{
          suppressScrollX: true,
          scrollYMarginOffset: 1,
        }}
      >
        <div className="px-page pb-4">
          {secondaryMenu.content}
        </div>
      </ScrollArea>
    </div>
  );
}
