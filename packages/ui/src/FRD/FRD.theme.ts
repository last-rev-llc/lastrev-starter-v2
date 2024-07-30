import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { type Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['FRD'] = {};

const styleOverrides: ComponentsOverrides<Theme>['FRD'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '& > *': {
      paddingTop: 'var(--section-padding)',
      paddingBottom: 'var(--section-padding)'
    },

    '[class*="Background-root"] + [class*=Section-contentWrap] & [class*=mainContentWrap]': {
      padding: 'var(--grid-gap)',
      paddingTop: 0
    },
    // TODO: Update to check if within a section
    // padding: theme.spacing(0, 4)
    // margin: theme.spacing(0, -4)
    'ins': {
      textDecoration: 'none',
      color: 'var(--variant-highlight-color)'
    }
  }),

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  sideNavWrap: ({ theme }) => ({
    'display': 'none',
    'gridRow': 1,

    '& *': {
      fontSize: 'var(--bodySmall-font-size)'
    },

    '& > *': {
      position: 'sticky',
      top: 0,
      overflow: 'scroll',
      maxHeight: '100vh',
      padding: 'var(--grid-gap)'
    },

    [theme.containerBreakpoints.up('md')]: {
      display: 'block',
      gridColumn: 'full-start / two-end'
    },

    [theme.containerBreakpoints.up('xl')]: {
      gridColumn: 'full-start / one-end'
    }
  }),

  contentWrap: ({ theme, ownerState }) => ({
    gridRow: 1,
    gridColumn: 'start / end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'three-start / end'
    },

    [theme.containerBreakpoints.up('xl')]: {
      gridColumn: 'two-start / end'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['FRD'] => [];

export const frdTheme = (theme: Theme): ThemeOptions => ({
  components: {
    FRD: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default frdTheme;
