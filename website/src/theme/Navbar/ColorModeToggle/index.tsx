import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type { Props } from '@theme/Navbar/ColorModeToggle';

export default function NavbarColorModeToggle({className}: Props) {
  const { disableSwitch, respectPrefersColorScheme } = useThemeConfig().colorMode;
  const { colorModeChoice, setColorMode } = useColorMode();

  // Do not render color mode toggle if it is disabled
  if (disableSwitch) {
    return null;
  }

  return (
    <ColorModeToggle
      className={className}
      respectPrefersColorScheme={respectPrefersColorScheme}
      value={colorModeChoice}
      onChange={setColorMode}
    />
  );
}
