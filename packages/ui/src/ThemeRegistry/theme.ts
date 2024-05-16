import {
  type Breakpoint,
  experimental_extendTheme as extendTheme,
  lighten,
  darken
} from '@mui/material/styles';

import { deepmerge } from '@mui/utils';

import generateGridStyles from './mixins/generateGridStyles';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import themeComponents from './theme.components';

import './theme.types';

import { Outfit } from 'next/font/google';

export const outfit = Outfit({
  weight: ['200', '300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
});

const defaultSpacing = 8;
const defaultBorderRadius = 8;

const commonColors = {
  black: '#00030B',
  white: '#ffffff',
  gray1: '#f8f8f8',
  gray2: '#E5E6E8',
  gray3: '#BBC5CB',
  gray4: '#7D909B',
  gray5: '#3C586A',
  midnight: '#00030B',
  yellow: '#FFD12B',
  aqua: '#00D1C0',
  periwinkle: '#596FFF',
  coolGrey: '#C3DCDE',
  platinum: '#E0E6E9',
  dark: '#000',
  neutralGrey: '#EAEBEC',
  darkGreen: '#2C5E4A',
  aquaPearl: '#68ABDD',
  greenishBlue: '#1264A3',
  brightGreen: '#6EFF29',
  transparentLight: 'rgba(0, 0, 0, 0)',
  transparentDark: 'rgba(255, 255, 255, 0)'
};

const schemes = {
  transparentLight: {
    primary: {
      main: commonColors.transparentLight,
      contrastText: commonColors.black,
      light: lighten(commonColors.transparentLight, 0.1),
      dark: darken(commonColors.transparentLight, 0.1)
    },
    secondary: {
      main: commonColors.coolGrey,
      contrastText: commonColors.white,
      light: lighten(commonColors.coolGrey, 0.1),
      dark: darken(commonColors.coolGrey, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.coolGrey
  },
  transparentDark: {
    primary: {
      main: commonColors.transparentDark,
      contrastText: commonColors.white,
      light: lighten(commonColors.transparentDark, 0.1),
      dark: darken(commonColors.transparentDark, 0.1)
    },
    secondary: {
      main: commonColors.coolGrey,
      contrastText: commonColors.white,
      light: lighten(commonColors.coolGrey, 0.1),
      dark: darken(commonColors.coolGrey, 0.1)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.coolGrey,
    overlayText: commonColors.black,
    highlightColor: commonColors.coolGrey
  },
  midnight: {
    primary: {
      main: commonColors.midnight,
      contrastText: commonColors.white,
      light: lighten(commonColors.coolGrey, 0.1),
      dark: darken(commonColors.coolGrey, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.coolGrey, 0.1),
      dark: darken(commonColors.coolGrey, 0.1)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.black,
    overlay: commonColors.white,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  },
  light: {
    primary: {
      main: commonColors.white,
      contrastText: commonColors.midnight,
      light: lighten(commonColors.white, 0.1),
      dark: darken(commonColors.midnight, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.midnight,
    headerColor: commonColors.midnight,
    text: commonColors.white,
    overlay: commonColors.midnight,
    overlayText: commonColors.midnight,
    highlightColor: commonColors.brightGreen
  },
  black: {
    primary: {
      main: commonColors.midnight,
      contrastText: commonColors.white,
      light: lighten(commonColors.midnight, 0.1),
      dark: darken(commonColors.midnight, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.black,
    overlay: commonColors.white,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  },
  yellow: {
    primary: {
      main: commonColors.yellow,
      contrastText: commonColors.black,
      light: lighten(commonColors.yellow, 0.1),
      dark: darken(commonColors.yellow, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.black,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.black,
    highlightColor: commonColors.black
  },
  aqua: {
    primary: {
      main: commonColors.aqua,
      contrastText: commonColors.black,
      light: lighten(commonColors.aqua, 0.1),
      dark: darken(commonColors.aqua, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  },
  periwinkle: {
    primary: {
      main: commonColors.periwinkle,
      contrastText: commonColors.black,
      light: lighten(commonColors.periwinkle, 0.1),
      dark: darken(commonColors.periwinkle, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  },
  coolGrey: {
    primary: {
      main: commonColors.coolGrey,
      contrastText: commonColors.black,
      light: lighten(commonColors.coolGrey, 0.1),
      dark: darken(commonColors.coolGrey, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  },
  platinum: {
    primary: {
      main: commonColors.platinum,
      contrastText: commonColors.black,
      light: lighten(commonColors.platinum, 0.1),
      dark: darken(commonColors.platinum, 0.1)
    },
    secondary: {
      main: commonColors.brightGreen,
      contrastText: commonColors.white,
      light: lighten(commonColors.brightGreen, 0.1),
      dark: darken(commonColors.brightGreen, 0.1)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.brightGreen
  }
};

export const breakpointsMinMax: Record<string, { min: number; max: number }> = {
  xs: { min: 0, max: 600 },
  sm: { min: 600, max: 800 },
  md: { min: 900, max: 1200 },
  lg: { min: 1200, max: 1920 },
  xl: { min: 1920, max: 2800 },
  xxl: { min: 2800, max: 3840 }
};

const paletteTheme = {
  breakpoints: {
    values: {
      xs: breakpointsMinMax.xs.min,
      sm: breakpointsMinMax.sm.min,
      md: breakpointsMinMax.md.min,
      lg: breakpointsMinMax.lg.min,
      xl: breakpointsMinMax.xl.min,
      xxl: breakpointsMinMax.xxl.min
    }
  },
  colorSchemes: {
    light: {
      palette: {
        schemes: schemes,
        ...schemes['light'],
        ...schemes
      }
    },
    dark: {
      palette: {
        schemes: schemes,
        ...schemes['midnight'],
        ...schemes
      }
    }
  }
};

const muiTheme = extendTheme(paletteTheme);
const baseTheme = {
  ...paletteTheme,
  spacing: defaultSpacing,
  shape: {
    borderRadius: defaultBorderRadius
  },
  mixins: {
    generateGridStyles,
    applyBackgroundColor
  },
  typography: {
    fontFamily: outfit.style.fontFamily,

    navLink: {
      fontWeight: 200,
      lineHeight: 'var(--bodyXSmall-line-height)',
      letterSpacing: '1px',
      fontFamily: outfit.style.fontFamily,
      fontSize: 'var(--bodyXSmall-font-size)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },

    body1: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    body2: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyXSmall: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--bodyXSmall-font-weight)',
      fontSize: 'var(--bodyXSmall-font-size)',
      lineHeight: 'var(--bodyXSmall-line-height)',
      margin: 'var(--bodyXSmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodySmall: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyLarge: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    display1: {
      display: 'block',
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)',
      letterSpacing: '1px'
    },
    display2: {
      display: 'block',
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h1: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h2: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h3: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h4: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h5: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h6: {
      fontFamily: outfit.style.fontFamily,
      fontWeight: 'var(--h6-font-weight)',
      fontSize: 'var(--h6-font-size)',
      lineHeight: 'var(--h6-line-height)',
      margin: 'var(--h6-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    subtitle1: {},
    subtitle2: {},
    overline: {
      display: 'block',
      fontFamily: outfit.style.fontFamily,
      letterSpacing: '1px',
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase',
      margin: 'var(--overline-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    button: {},
    caption: {}
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          // 'color': muiTheme.palette.text.primary,
          'textDecoration': 'none',
          'textDecorationColor': 'currentColor',

          '&:hover': {
            textDecoration: 'underline'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          'boxShadow': 'none',
          'fontSize': 18,
          'fontWeight': 600,
          'lineHeight': 1.55,
          'textTransform': 'none',

          '&:hover': {
            boxShadow: 'none'
          }
        },

        contained: {
          padding: muiTheme.spacing(2, 5),
          borderRadius: 50
          // '&:hover': {
          //   color: muiTheme.palette.common.white
          // }
        },
        outlined: {
          padding: muiTheme.spacing(2, 5),
          borderRadius: 50
          // '&:hover': {
          //   color: muiTheme.palette.common.white
          // }
        }

        // outlinedPrimary: {
        //   'borderColor': muiTheme.palette.primary.light,
        //   'color': muiTheme.palette.primary.dark,

        //   '&:hover': {
        //     backgroundColor: muiTheme.palette.primary.dark,
        //     borderColor: muiTheme.palette.primary.dark
        //   }
        // },

        // outlinedSecondary: {
        //   'borderColor': muiTheme.palette.primary.main,
        //   // 'color': muiTheme.palette.text.primary,

        //   '&:hover': {
        //     backgroundColor: muiTheme.palette.primary.main,
        //     borderColor: muiTheme.palette.primary.main
        //   }
        // },

        // text: {
        //   padding: 0,
        //   fontWeight: 600
        // },

        // textPrimary: {
        //   'color': muiTheme.palette.primary.dark,

        //   '&:hover': {
        //     backgroundColor: 'transparent',
        //     textDecoration: 'underline'
        //   }
        // },

        // textSecondary: {
        //   'color': muiTheme.palette.text.primary,

        //   '&:hover': {
        //     backgroundColor: 'transparent',
        //     textDecoration: 'underline'
        //   }
        // }
      }
    }
  },
  containerBreakpoints: {
    ...muiTheme.breakpoints,
    up: (key: Breakpoint | number) => {
      return muiTheme.breakpoints.up(key)?.replace('@media', '@container');
    },
    down: (key: Breakpoint | number) => {
      return muiTheme.breakpoints.down(key)?.replace('@media', '@container');
    }
  }
};

const coreTheme = extendTheme(baseTheme);

export const theme = extendTheme(
  deepmerge(baseTheme, {
    components: Object.values(themeComponents)
      .map((t) => t(coreTheme))
      .reduce((acc, current) => {
        return { ...acc, ...current.components };
      }, {})
  })
);

export const breakpoints = theme.breakpoints.values;
