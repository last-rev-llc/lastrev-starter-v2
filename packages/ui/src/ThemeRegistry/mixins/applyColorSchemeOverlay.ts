import { type Theme } from '../../ThemeRegistry/theme.types';

import { type CSSProperties } from '@mui/material/styles/createMixins';

type ApplyColorSchemeOverlay = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyColorSchemeOverlay: ApplyColorSchemeOverlay;
  }
}

export const applyColorSchemeOverlay: ApplyColorSchemeOverlay = ({
  ownerState,
  theme
}: {
  ownerState?: any;
  theme: Theme;
}) => {
  const colorScheme: string =
    ownerState?.color || ownerState?.backgroundColor || ownerState?.colorScheme;
  if (!colorScheme) return {};

  let overlayColorScheme = colorScheme;

  switch (colorScheme) {
    case 'white':
    case 'coolGrey':
    case 'light':
    case 'brightGreen':
      overlayColorScheme = 'black';
      break;

    case 'black':
    case 'dark':
    case 'darkerGreen':
    case 'darkGreen':
      overlayColorScheme = 'coolGrey';
      break;

    case 'coolGrey':
      overlayColorScheme = 'white';
      break;

    default:
      overlayColorScheme = colorScheme;
  }

  ownerState.color = overlayColorScheme;

  return theme.mixins.applyBackgroundColor({ ownerState, theme });
};

export default applyColorSchemeOverlay;
