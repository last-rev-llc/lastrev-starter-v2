import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Blog'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Blog'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({
      ownerState: { ...ownerState, backgroundColor: 'white' },
      theme
    }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '& > *': {
      paddingTop: 'var(--section-padding)',
      paddingBottom: 'var(--section-padding)'
    }
  }),

  featuredMediaWrap: ({ theme, ownerState }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 'var(--grid-gap-double)'
  }),

  sideContentWrap: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    paddingBottom: 'var(--grid-gap-double) 0',
    gridRow: 2,

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'eleven-end'
    }
  }),

  shareLinks: ({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--grid-gap)'
  }),

  shareLink: ({ theme }) => ({
    'gap': 'var(--grid-gap)',

    '& svg': {
      width: 'var(--grid-gap)',
      height: 'var(--grid-gap)'
    },

    '& .MuiTypography-root': {
      display: 'none'
    },

    [theme.containerBreakpoints.up('lg')]: {
      'gap': 'var(--grid-gap)',
      '& .MuiTypography-root': {
        ...theme.typography.bodySmall,
        display: 'block'
      }
    }
  }),

  authorImageWrap: ({ theme }) => ({
    gridRow: 1,
    gridColumnStart: 'start',
    gridColumnEnd: 'quarter',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'one-start',
      gridColumnEnd: 'one-end'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 1,
    alignSelf: 'center',
    marginBottom: 0,

    gridColumnStart: 'quarter',
    gridColumnEnd: 'end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'two-start'
    }
  }),

  authorSummaryWrap: ({ theme }) => ({
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 0,

    gridRow: 2,
    gridColumnStart: 'start',
    gridColumnEnd: 'end'
  }),

  authorSocialLinks: ({ theme }) => ({
    alignSelf: 'self-start',
    gridRow: 3,
    gridColumnStart: 'start',
    gridColumnEnd: 'end'
  }),

  sideContentInnerWrap: {
    'display': 'flex',
    'flexDirection': 'column',
    'borderLeft': 'solid',
    'borderLeftWidth': '1px',
    'paddingLeft': 'var(--grid-gap)',

    '& > *': {
      marginBottom: 0
    }
  },

  detailsLabel: {
    '&': {
      paddingBottom: 'var(--grid-gap)'
    }
  },

  bodyHeader: {
    '&:not(:first-of-type)': {
      paddingTop: 'var(--grid-gap)',
      marginTop: 'var(--grid-gap)',
      borderTop: 'solid',
      borderTopWidth: '1px'
    }
  },

  contentWrap: ({ theme }) => ({
    padding: 'var(--grid-gap-double) 0',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    gridRow: 1,

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'eleven-end'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Blog'] => [];

export const blogTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Blog: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default blogTheme;
