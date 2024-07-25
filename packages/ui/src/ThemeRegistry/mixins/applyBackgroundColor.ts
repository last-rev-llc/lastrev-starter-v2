import { type Theme } from '@mui/system';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import get from '../../utils/get';

type ApplyBackgroundColor = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyBackgroundColor: ApplyBackgroundColor;
  }
}

export const applyBackgroundColor: ApplyBackgroundColor = ({
  ownerState,
  theme
}: {
  ownerState?: any;
  theme: Theme;
}) => {
  if (!ownerState?.backgroundColor) return {};

  const backgroundColor: string = ownerState?.backgroundColor as any;
  let styles = {};
  if (
    backgroundColor?.toLowerCase()?.includes('gradient') &&
    get(theme.palette, backgroundColor)
  ) {
    styles = {
      background: get(theme.palette, `${backgroundColor}.main`),
      color: get(theme.palette, `${backgroundColor}.contrastText`)
    };
  } else {
    const paletteColor = backgroundColor?.includes('.')
      ? backgroundColor.split('.')[0]
      : `${backgroundColor}`;

    if (backgroundColor && theme.palette.schemes[paletteColor]) {
      styles = {
        'backgroundColor': theme.palette.schemes[paletteColor].primary.main,
        'color': theme.palette.text.primary,
        '--mui-palette-text-primary': theme.palette.schemes[paletteColor].primary.contrastText,
        '--mui-palette-primary-light': theme.palette.schemes[paletteColor].secondary.light,
        '--mui-palette-primary-main': theme.palette.schemes[paletteColor].secondary.main,
        '--mui-palette-primary-contrastText':
          theme.palette.schemes[paletteColor].secondary.contrastText,
        '--mui-palette-primary-dark': theme.palette.schemes[paletteColor].secondary.dark,
        '--variant-highlight-color': theme.palette.schemes[paletteColor].highlightColor,
        '--current-color-text': theme.palette.schemes[paletteColor].primary.contrastText,
        '--current-color-bg': theme.palette.schemes[paletteColor].primary.main
        // '--mui-palette-primary-main': `var(--mui-palette-${paletteColor}-accent)`
      };
    }
  }
  return styles;
};

export default applyBackgroundColor;
