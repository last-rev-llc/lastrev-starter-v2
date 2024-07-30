import { DM_Sans } from 'next/font/google';
import {
  type Breakpoint,
  experimental_extendTheme as extendTheme,
  lighten,
  darken,
  CssVarsThemeOptions
} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Theme } from '@mui/material/styles';

import { deepmerge } from '@mui/utils';

import generateGridStyles from './mixins/generateGridStyles';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import applyColorSchemeOverlay from './mixins/applyColorSchemeOverlay';
import themeComponents from './theme.components';

import './theme.types';

export const dmSans = DM_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['navy'];

const defaultSpacing = 8;
const defaultBorderRadius = 4;

const commonColors = {
  black: '#00030B',
  white: '#ffffff',
  gray1: '#f8f8f8',
  gray2: '#E5E6E8',
  gray3: '#BBC5CB',
  gray4: '#7D909B',
  gray5: '#3C586A',
  navy: '#000080',
  transparentLight: 'rgba(0, 0, 0, 0)',
  transparentDark: 'rgba(255, 255, 255, 0)'
};

const schemes = {
  transparentLight: {
    primary: {
      main: commonColors.transparentLight,
      contrastText: commonColors.black,
      light: lighten(commonColors.transparentLight, 0.2),
      dark: darken(commonColors.transparentLight, 0.2)
    },
    secondary: {
      main: commonColors.gray2,
      contrastText: commonColors.black,
      light: lighten(commonColors.gray2, 0.2),
      dark: darken(commonColors.gray2, 0.2)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.white,
    highlightColor: commonColors.gray2
  },
  transparentDark: {
    primary: {
      main: commonColors.transparentDark,
      contrastText: commonColors.white,
      light: lighten(commonColors.transparentDark, 0.2),
      dark: darken(commonColors.transparentDark, 0.2)
    },
    secondary: {
      main: commonColors.gray2,
      contrastText: commonColors.white,
      light: lighten(commonColors.gray2, 0.2),
      dark: darken(commonColors.gray2, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.gray2,
    overlayText: commonColors.black,
    highlightColor: commonColors.gray2
  },
  black: {
    primary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: lighten(commonColors.black, 0.2),
      dark: darken(commonColors.black, 0.2)
    },
    secondary: {
      main: commonColors.navy,
      contrastText: commonColors.white,
      light: lighten(commonColors.navy, 0.2),
      dark: darken(commonColors.navy, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.white,
    overlayText: commonColors.white,
    highlightColor: commonColors.navy
  },
  dark: {
    primary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: lighten(commonColors.black, 0.2),
      dark: darken(commonColors.black, 0.2)
    },
    secondary: {
      main: commonColors.navy,
      contrastText: commonColors.white,
      light: lighten(commonColors.navy, 0.2),
      dark: darken(commonColors.navy, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.white,
    overlayText: commonColors.white,
    highlightColor: commonColors.navy
  },
  white: {
    primary: {
      main: commonColors.white,
      contrastText: commonColors.black,
      light: lighten(commonColors.white, 0.2),
      dark: darken(commonColors.white, 0.2)
    },
    secondary: {
      main: commonColors.navy,
      contrastText: commonColors.white,
      light: lighten(commonColors.navy, 0.2),
      dark: darken(commonColors.navy, 0.2)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.black,
    highlightColor: commonColors.navy
  },
  light: {
    primary: {
      main: commonColors.white,
      contrastText: commonColors.black,
      light: lighten(commonColors.white, 0.2),
      dark: darken(commonColors.white, 0.2)
    },
    secondary: {
      main: commonColors.navy,
      contrastText: commonColors.white,
      light: lighten(commonColors.navy, 0.2),
      dark: darken(commonColors.navy, 0.2)
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.black,
    highlightColor: commonColors.navy
  },
  navy: {
    primary: {
      main: commonColors.navy,
      contrastText: commonColors.white,
      light: lighten(commonColors.navy, 0.2),
      dark: darken(commonColors.navy, 0.2)
    },
    secondary: {
      main: commonColors.gray2,
      contrastText: commonColors.white,
      light: lighten(commonColors.gray2, 0.2),
      dark: darken(commonColors.gray2, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.white,
    overlayText: commonColors.black,
    highlightColor: commonColors.navy
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
        text: {
          primary: schemes['light'].text,
          secondary: schemes['light'].text
        }
      }
    },
    dark: {
      palette: {
        schemes: schemes,
        ...schemes['dark'],
        text: {
          primary: schemes['dark'].text,
          secondary: schemes['dark'].text
        }
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
    applyBackgroundColor,
    applyColorSchemeOverlay
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,

    navLink: {
      fontWeight: 200,
      lineHeight: 'var(--bodyXSmall-line-height)',
      letterSpacing: '1px',
      fontFamily: dmSans.style.fontFamily,
      fontSize: 'var(--bodyXSmall-font-size)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },

    body1: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--body1-font-weight)',
      fontSize: 'var(--body1-font-size)',
      lineHeight: 'var(--body1-line-height)',
      margin: 'var(--body1-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    body2: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--body2-font-weight)',
      fontSize: 'var(--body2-font-size)',
      lineHeight: 'var(--body2-line-height)',
      margin: 'var(--body2-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyXSmall: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--bodyXSmall-font-weight)',
      fontSize: 'var(--bodyXSmall-font-size)',
      lineHeight: 'var(--bodyXSmall-line-height)',
      margin: 'var(--bodyXSmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodySmall: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyLarge: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    display1: {
      display: 'block',
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)',
      letterSpacing: '1px'
    },
    display2: {
      display: 'block',
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h1: {
      textTransform: 'uppercase' as const,
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h1-font-weight)',
      fontSize: 'var(--h1-font-size)',
      lineHeight: 'var(--h1-line-height)',
      margin: 'var(--h1-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h2: {
      textTransform: 'uppercase' as const,
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h2-font-weight)',
      fontSize: 'var(--h2-font-size)',
      lineHeight: 'var(--h2-line-height)',
      margin: 'var(--h2-margin)',
      fontStyle: 'normal',
      letterSpacing: '1px',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h3: {
      textTransform: 'uppercase' as const,
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h3-font-weight)',
      fontSize: 'var(--h3-font-size)',
      lineHeight: 'var(--h3-line-height)',
      margin: 'var(--h3-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h4: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h4-font-weight)',
      fontSize: 'var(--h4-font-size)',
      lineHeight: 'var(--h4-line-height)',
      margin: 'var(--h4-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h5: {
      fontFamily: dmSans.style.fontFamily,
      fontWeight: 'var(--h5-font-weight)',
      fontSize: 'var(--h5-font-size)',
      lineHeight: 'var(--h5-line-height)',
      margin: 'var(--h5-margin)',
      fontStyle: 'normal',
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h6: {
      fontFamily: dmSans.style.fontFamily,
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
      fontFamily: dmSans.style.fontFamily,
      letterSpacing: '1px',
      fontWeight: 'var(--overline-font-weight)',
      fontSize: 'var(--overline-font-size)',
      lineHeight: 'var(--overline-line-height)',
      textTransform: 'uppercase' as const,
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
          'fontSize': 16,
          'fontWeight': 400,
          'lineHeight': 1.55,
          'textTransform': 'uppercase' as const,

          '&:hover': {
            boxShadow: 'none'
          }
        },

        contained: {
          padding: muiTheme.spacing(2, 3)
          // borderRadius: 50
          // '&:hover': {
          //   color: muiTheme.palette.common.white
          // }
        },
        outlined: {
          padding: muiTheme.spacing(2, 3)
          // borderRadius: 50
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
        //   'color': muiTheme.vars.palette.primary.dark,

        //   '&:hover': {
        //     backgroundColor: 'transparent',
        //     textDecoration: 'underline'
        //   }
        // }

        // textSecondary: {
        //   'color': muiTheme.palette.text.primary,

        //   '&:hover': {
        //     backgroundColor: 'transparent',
        //     textDecoration: 'underline'
        //   }
        // }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--mui-palette-text-primary, inherit)',
          borderWidth: 1,
          borderRadius: 30
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--mui-palette-text-primary, inherit)',
            borderWidth: 1
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--mui-palette-text-primary, inherit)',
            borderWidth: 1
          }
        },
        input: ({ theme }: { theme: Theme }) => ({
          padding: theme.spacing(1, 2)
        })
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

const typedThemeComponents = themeComponents as Record<
  string,
  (theme: Theme) => { components: Record<string, any> }
>;

export const theme = extendTheme(
  deepmerge(baseTheme, {
    components: Object.values(typedThemeComponents)
      .map((t) => t(coreTheme))
      .reduce((acc, current) => {
        return { ...acc, ...current.components };
      }, {} as Record<string, any>)
  })
);

export const breakpoints = theme.breakpoints.values;
