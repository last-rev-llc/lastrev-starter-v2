import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { type Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Quote'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Quote'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    padding: `var(--section-padding) 0`
  }),

  // contentGrid: : {},

  logo: ({ theme }) => ({
    gridRow: 1,
    gridColumn: 'quarter/three-quarter',

    [theme.containerBreakpoints.up('sm')]: {
      gridColumn: 'four-start/five-end'
    },

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'six-start/seven-end'
    },

    [theme.containerBreakpoints.up('lg')]: {
      gridColumn: 'six-start/seven-end'
    }
  }),

  quoteText: ({ theme }) => ({
    gridRow: 2,
    gridColumn: 'start/end',
    textAlign: 'center',
    ...theme.typography.display4,

    [theme.containerBreakpoints.up('sm')]: {
      gridColumn: 'quarter/three-quarter'
    }
  }),

  // quoteSymbol: : {},

  authorRoot: {
    display: 'contents'
  },

  image: ({ theme }) => ({
    gridRow: '3/5',
    gridColumn: 'start/one-end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'quarter/half'
    },

    [theme.containerBreakpoints.up('lg')]: {
      gridColumn: 'six-start/half'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 3,
    gridColumn: 'two-start/end',
    lineHeight: 1,
    alignSelf: 'flex-end',

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'half/end'
    }
  }),

  authorTitle: ({ theme }) => ({
    gridRow: 4,
    gridColumn: 'two-start/end',
    fontStyle: 'italic',
    lineHeight: 1,

    [theme.containerBreakpoints.up('md')]: {
      gridColumn: 'half/end'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Quote'] => [];

export const quoteTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Quote: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default quoteTheme;
