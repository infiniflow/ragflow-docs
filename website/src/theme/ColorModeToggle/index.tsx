import React, { type ReactNode } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/ColorModeToggle';
import type { ColorMode } from '@docusaurus/theme-common';

import IconDarkMode from '@theme/Icon/DarkMode';
import IconLightMode from '@theme/Icon/LightMode';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';

import { cn } from '@site/src/utils/twUtils';

// The order of color modes is defined here, and can be customized with swizzle
function getNextColorMode(
  colorMode: ColorMode | null,
  respectPrefersColorScheme: boolean,
) {
  // 2-value transition
  if (!respectPrefersColorScheme) {
    return colorMode === 'dark' ? 'light' : 'dark';
  }

  // 3-value transition
  switch (colorMode) {
    case null:
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeLabel(colorMode: ColorMode | null): string {
  switch (colorMode) {
    case null:
      return translate({
        message: 'system mode',
        id: 'theme.colorToggle.ariaLabel.mode.system',
        description: 'The name for the system color mode',
      });
    case 'light':
      return translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
    case 'dark':
      return translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel(colorMode: ColorMode | null) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the color mode toggle',
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}

function CurrentColorModeIcon({ value }: { value: ColorMode | null }): ReactNode {
  // 3 icons are always rendered for technical reasons
  // We use "data-theme-choice" to render the correct one
  // This must work even before React hydrates
  switch (value) {
    case 'light':
      return <IconLightMode />;
    case 'dark':
      return <IconDarkMode />;
    default:
      return <IconSystemColorMode />;
  };
}

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();

  return (
    <div className={cn(className)}>
      <button
        className={cn(
          'clean-btn',
          'text-base leading-none flex items-center justify-center',
          'p-3 size-full rounded-full transition-colors',
          'hover:bg-hover-overlay focus-visible:bg-hover-overlay',
          !isBrowser && 'cursor-not-allowed',
          buttonClassName,
        )}
        type="button"
        onClick={() =>
          onChange(getNextColorMode(value, respectPrefersColorScheme))
        }
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}

        // For accessibility decisions
        // See https://github.com/facebook/docusaurus/issues/7667#issuecomment-2724401796

        // aria-live disabled on purpose - This is annoying because:
        // - without this attribute, VoiceOver doesn't announce on button enter
        // - with this attribute, VoiceOver announces twice on ctrl+opt+space
        // - with this attribute, NVDA announces many times
        // aria-live="polite"
      >
        <CurrentColorModeIcon value={value} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
