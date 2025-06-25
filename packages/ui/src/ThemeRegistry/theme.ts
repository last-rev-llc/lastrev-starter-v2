import { Plus_Jakarta_Sans } from 'next/font/google';
import {
  type Breakpoint,
  experimental_extendTheme as extendTheme,
  lighten,
  darken,
  ThemeOptions
} from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Theme } from '@mui/material/styles';

import { deepmerge } from '@mui/utils';

import generateGridStyles from './mixins/generateGridStyles';
import applyBackgroundColor from './mixins/applyBackgroundColor';
import applyColorSchemeOverlay from './mixins/applyColorSchemeOverlay';
import themeComponents from './theme.components';

import './theme.types';

export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export const mainColors = ['primaryRed', 'lensRed'];

const defaultSpacing = 8;
const defaultBorderRadius = 8;

// Design System Color Tokens - Hierarchical Color System
const commonColors = {
  // Primary Red Scale - Brand Colors
  primaryRed: '#EE312E', // Red 500 - Primary brand color
  red600: '#D3222A', // Red 600 - Hover states, secondary emphasis
  red700: '#AF292E', // Red 700 - Darker accents
  red800: '#921A1D', // Red 800 - Deep emphasis
  red900: '#5F091D', // Red 900 - Least used, maximum contrast

  // Neutral Colors - Areas of calm to balance red palette
  white: '#FFFFFF', // White 0 - Primary background
  black: '#000000', // Pure black
  gray100: '#F5F3F3', // Gray 1 - Light backgrounds
  gray200: '#DADADA', // Gray 2 - Borders, dividers
  gray300: '#A0A2A5', // Gray 3 - Disabled states
  gray500: '#6F7377', // Gray 4 - Secondary text
  gray700: '#50565F', // Gray 700 - Body text alternative
  gray800: '#3C424B', // Gray 800 - Dark UI elements
  gray900: '#282E37', // Gray 5 - Primary text
  gray950: '#141423', // Gray 950 - Maximum contrast

  // Secondary Colors - For data visualization only
  magenta500: '#C247FA', // Charts, graphs (warning)
  violet500: '#8B48FA', // Data visualization
  violet700: '#642FCF', // Intense warning states
  sky500: '#00D3F3', // Information, safety
  azure600: '#0086FA', // Primary info color
  azure800: '#084CCE', // Intense safety states

  // Utility Colors - Success, error, warning states
  utilityRed: '#EE312E', // Error states
  utilityOrange: '#FF6B00', // Warning states
  utilityYellow: '#FFD500', // Caution/attention
  utilityGreen: '#00C851', // Success states
  utilityBlue: '#0066FF', // Information states

  // Transparent colors for overlays
  transparentLight: 'rgba(0, 0, 0, 0)',
  transparentDark: 'rgba(255, 255, 255, 0)'
};

const schemes = {
  transparentLight: {
    primary: {
      main: commonColors.transparentLight,
      contrastText: commonColors.gray900,
      light: lighten(commonColors.transparentLight, 0.2),
      dark: darken(commonColors.transparentLight, 0.2)
    },
    secondary: {
      main: commonColors.gray200,
      contrastText: commonColors.gray900,
      light: lighten(commonColors.gray200, 0.2),
      dark: darken(commonColors.gray200, 0.2)
    },
    linkColor: commonColors.primaryRed,
    headerColor: commonColors.gray900,
    text: commonColors.gray900,
    overlay: commonColors.gray900,
    overlayText: commonColors.white,
    highlightColor: commonColors.gray200
  },
  transparentDark: {
    primary: {
      main: commonColors.transparentDark,
      contrastText: commonColors.white,
      light: lighten(commonColors.transparentDark, 0.2),
      dark: darken(commonColors.transparentDark, 0.2)
    },
    secondary: {
      main: commonColors.gray700,
      contrastText: commonColors.white,
      light: lighten(commonColors.gray700, 0.2),
      dark: darken(commonColors.gray700, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.gray700,
    overlayText: commonColors.white,
    highlightColor: commonColors.gray700
  },
  black: {
    primary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: lighten(commonColors.black, 0.2),
      dark: darken(commonColors.black, 0.2)
    },
    secondary: {
      main: commonColors.primaryRed,
      contrastText: commonColors.white,
      light: lighten(commonColors.primaryRed, 0.2),
      dark: darken(commonColors.primaryRed, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.white,
    overlayText: commonColors.black,
    highlightColor: commonColors.primaryRed
  },
  dark: {
    primary: {
      main: commonColors.gray900,
      contrastText: commonColors.white,
      light: lighten(commonColors.gray900, 0.2),
      dark: darken(commonColors.gray900, 0.2)
    },
    secondary: {
      main: commonColors.primaryRed,
      contrastText: commonColors.white,
      light: lighten(commonColors.primaryRed, 0.2),
      dark: darken(commonColors.primaryRed, 0.2)
    },
    linkColor: commonColors.white,
    headerColor: commonColors.white,
    text: commonColors.white,
    overlay: commonColors.white,
    overlayText: commonColors.black,
    highlightColor: commonColors.primaryRed
  },
  white: {
    primary: {
      main: commonColors.white,
      contrastText: commonColors.gray900,
      light: commonColors.gray100,
      dark: commonColors.gray200
    },
    secondary: {
      main: commonColors.primaryRed,
      contrastText: commonColors.white,
      light: lighten(commonColors.primaryRed, 0.2),
      dark: darken(commonColors.primaryRed, 0.2)
    },
    linkColor: commonColors.primaryRed,
    headerColor: commonColors.gray900,
    text: commonColors.gray900,
    overlay: commonColors.gray900,
    overlayText: commonColors.white,
    highlightColor: commonColors.primaryRed
  },
  light: {
    primary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: commonColors.gray100,
      dark: commonColors.gray200
    },
    secondary: {
      main: commonColors.violet500,
      contrastText: commonColors.white,
      light: commonColors.magenta500,
      dark: commonColors.violet700
    },
    linkColor: commonColors.black,
    headerColor: commonColors.gray900,
    text: commonColors.gray900,
    overlay: commonColors.gray900,
    overlayText: commonColors.white,
    highlightColor: commonColors.black
  },
  primaryRed: {
    primary: {
      main: commonColors.primaryRed,
      contrastText: commonColors.black,
      light: commonColors.red600,
      dark: commonColors.red700
    },
    secondary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: commonColors.gray100,
      dark: commonColors.gray200
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.black,
    highlightColor: commonColors.red600
  },
  lensRed: {
    primary: {
      main: commonColors.primaryRed,
      contrastText: commonColors.black,
      light: commonColors.red600,
      dark: commonColors.red700
    },
    secondary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: commonColors.gray100,
      dark: commonColors.gray200
    },
    linkColor: commonColors.black,
    headerColor: commonColors.black,
    text: commonColors.black,
    overlay: commonColors.black,
    overlayText: commonColors.black,
    highlightColor: commonColors.red600
  },
  lightPrimary1: {
    primary: {
      main: commonColors.white,
      contrastText: commonColors.gray700,
      light: commonColors.gray200,
      dark: commonColors.gray100,
      divider: commonColors.gray200
    },
    secondary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: commonColors.gray100,
      dark: commonColors.gray200
    },
    background: {
      paper: commonColors.gray100
    }
  },
  lightPrimary3: {
    primary: {
      main: commonColors.gray100,
      contrastText: commonColors.gray700,
      light: commonColors.gray200,
      dark: commonColors.gray300,
      divider: commonColors.gray200
    },
    secondary: {
      main: commonColors.black,
      contrastText: commonColors.white,
      light: commonColors.gray100,
      dark: commonColors.gray200
    }
  },
  darkPrimary2: {
    primary: {
      main: commonColors.gray900,
      contrastText: commonColors.white,
      light: commonColors.gray800,
      dark: commonColors.gray900,
      divider: commonColors.gray200
    },
    secondary: {
      main: commonColors.white,
      contrastText: commonColors.black,
      light: commonColors.gray100,
      dark: commonColors.gray200
    }
  }
};

export const breakpointsMinMax: Record<string, { min: number; max: number }> = {
  xs: { min: 0, max: 600 },
  sm: { min: 600, max: 800 },
  md: { min: 900, max: 1248 },
  lg: { min: 1248, max: 1920 },
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
        // Design System Extensions
        neutral: {
          white: commonColors.white,
          black: commonColors.black
        },
        utility: {
          red: commonColors.utilityRed,
          orange: commonColors.utilityOrange,
          yellow: commonColors.utilityYellow,
          green: commonColors.utilityGreen,
          blue: commonColors.utilityBlue
        },
        designSystemSecondary: {
          magenta500: commonColors.magenta500,
          violet500: commonColors.violet500,
          violet700: commonColors.violet700,
          sky500: commonColors.sky500,
          azure600: commonColors.azure600,
          azure800: commonColors.azure800
        },
        text: {
          primary: commonColors.gray900,
          secondary: commonColors.gray700,
          disabled: commonColors.gray300
        },
        background: {
          default: commonColors.white,
          paper: commonColors.gray100
        },
        error: {
          main: commonColors.utilityRed
        },
        warning: {
          main: commonColors.utilityOrange
        },
        info: {
          main: commonColors.utilityBlue
        },
        success: {
          main: commonColors.utilityGreen
        },
        grey: {
          50: commonColors.white,
          100: commonColors.gray100,
          200: commonColors.gray200,
          300: commonColors.gray300,
          400: commonColors.gray500,
          500: commonColors.gray500,
          600: commonColors.gray700,
          700: commonColors.gray700,
          800: commonColors.gray800,
          900: commonColors.gray900
        }
      }
    },
    dark: {
      palette: {
        schemes: schemes,
        ...schemes['dark'],
        // Design System Extensions
        neutral: {
          white: commonColors.white,
          black: commonColors.black
        },
        utility: {
          red: commonColors.utilityRed,
          orange: commonColors.utilityOrange,
          yellow: commonColors.utilityYellow,
          green: commonColors.utilityGreen,
          blue: commonColors.utilityBlue
        },
        designSystemSecondary: {
          magenta500: commonColors.magenta500,
          violet500: commonColors.violet500,
          violet700: commonColors.violet700,
          sky500: commonColors.sky500,
          azure600: commonColors.azure600,
          azure800: commonColors.azure800
        },
        text: {
          primary: commonColors.white,
          secondary: commonColors.gray300,
          disabled: commonColors.gray700
        },
        background: {
          default: commonColors.gray900,
          paper: commonColors.gray800
        },
        error: {
          main: commonColors.utilityRed
        },
        warning: {
          main: commonColors.utilityOrange
        },
        info: {
          main: commonColors.utilityBlue
        },
        success: {
          main: commonColors.utilityGreen
        },
        grey: {
          50: commonColors.gray950,
          100: commonColors.gray900,
          200: commonColors.gray800,
          300: commonColors.gray700,
          400: commonColors.gray500,
          500: commonColors.gray500,
          600: commonColors.gray300,
          700: commonColors.gray200,
          800: commonColors.gray100,
          900: commonColors.white
        }
      }
    }
  }
};

const muiTheme = extendTheme(paletteTheme);

const baseTheme: ThemeOptions = {
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
    fontFamily: plusJakartaSans.style.fontFamily,

    navLink: {
      fontWeight: 500,
      lineHeight: 'var(--bodyXSmall-line-height)',
      letterSpacing: '0.02857em',
      fontFamily: plusJakartaSans.style.fontFamily,
      fontSize: 'var(--bodyXSmall-font-size)',
      color: 'var(--mui-palette-text-primary, inherit)',
      textTransform: 'none' as const
    },

    // Design System Typography - Body styles
    body1: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 400, // Regular per design system
      fontSize: '16px', // 16px per design system
      lineHeight: 1.5, // 1.5 per design system
      margin: 'var(--body1-margin)',
      color: 'var(--mui-palette-text-primary, inherit)',
      letterSpacing: '0.00938em' // Design system spec
    },
    body2: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 400, // Regular per design system
      fontSize: '14px', // 14px per design system
      lineHeight: 1.43, // Calculated from design system
      margin: 'var(--body2-margin)',
      color: 'var(--mui-palette-text-primary, inherit)',
      letterSpacing: '0.01071em' // Design system spec
    },
    bodyXSmall: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 'var(--bodyXSmall-font-weight)',
      fontSize: 'var(--bodyXSmall-font-size)',
      lineHeight: 'var(--bodyXSmall-line-height)',
      margin: 'var(--bodyXSmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodySmall: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 'var(--bodySmall-font-weight)',
      fontSize: 'var(--bodySmall-font-size)',
      lineHeight: 'var(--bodySmall-line-height)',
      margin: 'var(--bodySmall-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    bodyLarge: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 'var(--bodyLarge-font-weight)',
      fontSize: 'var(--bodyLarge-font-size)',
      lineHeight: 'var(--bodyLarge-line-height)',
      margin: 'var(--bodyLarge-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    display1: {
      display: 'block',
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 'var(--display1-font-weight)',
      fontSize: 'var(--display1-font-size)',
      lineHeight: 'var(--display1-line-height)',
      margin: 'var(--display1-margin)',
      color: 'var(--mui-palette-text-primary-header, inherit)',
      letterSpacing: '-0.01562em',
      textTransform: 'none' as const
    },
    display2: {
      display: 'block',
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 'var(--display2-font-weight)',
      fontSize: 'var(--display2-font-size)',
      lineHeight: 'var(--display2-line-height)',
      margin: 'var(--display2-margin)',
      letterSpacing: '-0.00833em',
      textTransform: 'none' as const,
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    // Design System Typography - Heading styles with exact specifications
    h1: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '48px', // 48px per design system
      lineHeight: 1.2, // 1.2 per design system
      margin: 'var(--h1-margin)',
      fontStyle: 'normal',
      letterSpacing: '-0.01562em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)',
      textTransform: 'none' as const
    },
    h2: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '32px', // 32px per design system
      lineHeight: 1.25, // 1.25 per design system
      margin: 'var(--h2-margin)',
      fontStyle: 'normal',
      letterSpacing: '-0.00833em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)',
      textTransform: 'none' as const
    },
    h3: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '24px', // 24px per design system
      lineHeight: 1.3, // 1.3 per design system
      margin: 'var(--h3-margin)',
      fontStyle: 'normal',
      letterSpacing: '0em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)',
      textTransform: 'none' as const
    },
    h4: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '20px', // 20px per design system
      lineHeight: 1.35, // 1.35 per design system
      margin: 'var(--h4-margin)',
      fontStyle: 'normal',
      letterSpacing: '0.00735em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h5: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '18px', // 18px per design system
      lineHeight: 1.4, // 1.4 per design system
      margin: 'var(--h5-margin)',
      fontStyle: 'normal',
      letterSpacing: '0em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    h6: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 400, // Regular per design system (only h6 uses regular)
      fontSize: '18px', // 18px per design system
      lineHeight: 1.4, // 1.4 per design system
      margin: 'var(--h6-margin)',
      letterSpacing: '0.0075em', // Design system spec
      color: 'var(--mui-palette-text-primary-header, inherit)'
    },
    subtitle1: {},
    subtitle2: {},
    // Design System Typography - Overline/Label style
    overline: {
      display: 'block',
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 400, // Regular per design system
      fontSize: '14px', // 14px per design system
      lineHeight: 2.66, // 2.66 per design system
      letterSpacing: '0.08333em', // Design system spec
      textTransform: 'uppercase' as const, // Uppercase per design system
      margin: 'var(--overline-margin)',
      color: 'var(--mui-palette-text-primary, inherit)'
    },
    // Design System Typography - Button/CTA style
    button: {
      fontFamily: plusJakartaSans.style.fontFamily,
      fontWeight: 500, // Medium per design system
      fontSize: '16px', // 16px per design system
      lineHeight: 1.75, // 1.75 per design system
      letterSpacing: '0.02857em', // Design system spec
      textTransform: 'none' as const // No text transform per design system
    },
    caption: {}
  },
  components: {
    // MuiLink: {
    //   styleOverrides: {
    //     root: {
    //       // 'textDecoration': 'none',
    //       // 'textDecorationColor': 'currentColor',

    //       '&:hover': {
    //         textDecoration: 'underline'
    //       }
    //     }
    //   }
    // },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          padding: muiTheme.spacing(2, 3)
        },
        // Contained variant - only override specific states
        containedPrimary: {
          '&:active': {
            backgroundColor: commonColors.red700
          },
          '&.Mui-disabled': {
            backgroundColor: commonColors.gray200,
            color: commonColors.gray500
          }
        },
        containedSecondary: {
          '&:active': {
            backgroundColor: commonColors.gray950
          },
          '&.Mui-disabled': {
            backgroundColor: commonColors.gray200,
            color: commonColors.gray500
          }
        },
        // Text variant - only override specific states
        textPrimary: {
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'transparent'
          },
          '&:active': {
            color: commonColors.red700
          },
          '&.Mui-disabled': {
            color: commonColors.gray300
          }
        },
        textSecondary: {
          '&:hover': {
            textDecoration: 'underline',
            backgroundColor: 'transparent'
          },
          '&:active': {
            color: commonColors.gray950
          },
          '&.Mui-disabled': {
            color: commonColors.gray300
          }
        },
        // Outlined variant - only override specific states
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: 'transparent'
          },
          '&:active': {
            borderColor: commonColors.red700,
            color: commonColors.red700
          },
          '&.Mui-disabled': {
            borderColor: commonColors.gray200,
            color: commonColors.gray300
          }
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: 'transparent'
          },
          '&:active': {
            borderColor: commonColors.gray950,
            color: commonColors.gray950
          },
          '&.Mui-disabled': {
            borderColor: commonColors.gray200,
            color: commonColors.gray300
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--mui-palette-text-primary, inherit)',
          borderWidth: 1,
          borderRadius: defaultBorderRadius
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--mui-palette-text-primary, inherit)',
            borderWidth: 1
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: commonColors.primaryRed,
            borderWidth: 2
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
