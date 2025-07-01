// import { type Theme } from '@mui/material/styles';
import { type CSSProperties } from '@mui/material/styles/createMixins';
import { Theme } from '../theme.types';
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
  const colorScheme: string =
    ownerState?.color || ownerState?.backgroundColor || ownerState?.colorScheme;
  if (!colorScheme) return {};
  let styles = {};
  let backgroundKey = 'backgroundColor';
  if (colorScheme?.toLowerCase()?.includes('gradient')) {
    backgroundKey = 'background';
  }

  // Map color scheme names to palette keys
  const colorSchemeMap: Record<string, string> = {
    'Lens Red': 'lensRed',
    'Lens Red Primary': 'lensRedPrimary',
    'Primary Red': 'primaryRed',
    'Light Primary-1': 'lightPrimary1',
    'Light Primary-3': 'lightPrimary3',
    'Dark Primary-2': 'darkPrimary2'
  };

  const paletteColor = colorSchemeMap[colorScheme] || 
    (colorScheme?.includes('.') ? colorScheme.split('.')[0] : colorScheme);

  if (colorScheme && theme.vars.palette.schemes[paletteColor]) {
    // Don't set the default background for lens schemes - we'll handle them specially below
    const isLensRed = colorScheme === 'Lens Red' || colorScheme === 'lensRed';
    const isLensRedPrimary = colorScheme === 'Lens Red Primary' || colorScheme === 'lensRedPrimary';

    styles = {
      ...(!isLensRed && !isLensRedPrimary
        ? { [backgroundKey]: theme.vars.palette.schemes[paletteColor].primary.main }
        : {}),
      '--mui-palette-background-tab': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-overline': theme.vars.palette.schemes[paletteColor].overline,
      '--swiper-theme-color': theme.vars.palette.schemes[paletteColor].primary.contrastText,

      // Color inversion
      '--mui-palette-text-primary': theme.vars.palette.schemes[paletteColor].primary.contrastText,
      '--mui-palette-background-paper':
        theme.vars.palette.schemes[paletteColor].background?.paper ??
        theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-primary-light': theme.vars.palette.schemes[paletteColor].secondary.light,
      '--mui-palette-primary-main': theme.vars.palette.schemes[paletteColor].secondary.main,
      '--mui-palette-primary-contrastText':
        theme.vars.palette.schemes[paletteColor].secondary.contrastText,
      '--mui-palette-primary-dark': theme.vars.palette.schemes[paletteColor].secondary.dark,

      '--mui-palette-secondary-light': theme.vars.palette.schemes[paletteColor].primary.light,
      '--mui-palette-secondary-main': theme.vars.palette.schemes[paletteColor].primary.main,
      '--mui-palette-secondary-contrastText':
        theme.vars.palette.schemes[paletteColor].primary.contrastText,
      '--mui-palette-secondary-dark': theme.vars.palette.schemes[paletteColor].primary.dark,
      '--mui-palette-divider':
        theme.vars.palette.schemes[paletteColor].primary.divider ??
        theme.vars.palette.schemes[paletteColor].primary.contrastText,

      // '[stroke]': {
      //   stroke: 'var(--mui-palette-text-primary) !important'
      // },

      '.some-logo-text [fill]': {
        fill: 'var(--mui-palette-text-primary) !important'
      },

      '.logo-text': {
        fill: 'var(--mui-palette-text-primary) !important'
      },

      // Theme colors
      '--variant-highlight-color': theme.vars.palette.schemes[paletteColor].highlightColor,
      '--mui-palette-text-primary-header': theme.vars.palette.schemes[paletteColor].headerColor,
      '--mui-palette-text-primary-overlay': theme.vars.palette.schemes[paletteColor].overlayText

      // '& *': {
      //   borderColor: theme.vars.palette.schemes[paletteColor].highlightColor
      // },
      // '& ::marker': {
      //   color: theme.vars.palette.schemes[paletteColor].primary.contrastText
      // }
    };

    // Apply SVG pattern for lens backgrounds
    if (colorScheme === 'Lens Red' || colorScheme === 'lensRed') {
      styles = {
        ...styles,
        background: `url('/assets/lens-top-right.svg') no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'top right'
      };
    } else if (colorScheme === 'Lens Red Primary' || colorScheme === 'lensRedPrimary') {
      styles = {
        ...styles,
        background: `url('/assets/lens-top-red-primary.svg') no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'top right'
      };
    }

    // Apply inset padding if specified - applies to the pseudo-element
    if (ownerState?.insetPadding) {
      const insetValue = '56px';
      styles = {
        ...styles,
        paddingTop: insetValue,
        paddingBottom: insetValue
      };
    }
  }

  return styles;
};

export default applyBackgroundColor;
