import { Mixins } from '@mui/material/styles/createMixins';
import {
  type TypographyStyle,
  type Breakpoints,
  type CssVarsTheme,
  type Theme as MUITheme
} from '@mui/material/styles';
import { Palette as MuiPalette } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    paper: string;
    contrastText: string;
  }

  interface Palette {
    tertiary?: MuiPalette['primary'];
    transparentLight?: MuiPalette['primary'];
    transparentDark?: MuiPalette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    transparentLight?: PaletteOptions['primary'];
    transparentDark?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    xxl: true; // adds the `xxl` breakpoint
  }

  interface Theme {
    mixins: Mixins;
    containerBreakpoints: Breakpoints;
  }

  interface ThemeOptions {
    containerBreakpoints?: Breakpoints;
  }

  interface TypographyVariants {
    bodySmall: TypographyStyle;
    bodyLarge: TypographyStyle;
    display1: TypographyStyle;
    display2: TypographyStyle;
    display3: TypographyStyle;
    display4: TypographyStyle;
    display5: TypographyStyle;
    display6: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    display4?: TypographyStyle;
    display5?: TypographyStyle;
    display6?: TypographyStyle;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall?: true;
    bodyLarge?: true;
    display1?: true;
    display2?: true;
    display3?: true;
    display4?: true;
    display5?: true;
    display6?: true;
  }
  type TypographyOptions = {
    bodySmall?: TypographyStyle;
    bodyLarge?: TypographyStyle;
    display1?: TypographyStyle;
    display2?: TypographyStyle;
    display3?: TypographyStyle;
    display4?: TypographyStyle;
    display5?: TypographyStyle;
    display6?: TypographyStyle;
  };
}

export type Theme = Omit<MUITheme, 'palette'> & CssVarsTheme;
