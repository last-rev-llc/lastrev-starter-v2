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
      ownerState: { ...ownerState, backgroundColor: 'light' },
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
    gridColumnStart: 'two-start',
    gridColumnEnd: 'eleven-end',
    paddingBottom: 'var(--grid-gap-double)',
    gridRow: 2
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
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-quarter',

    [theme.breakpoints.up('md')]: {
      gridRow: '1/ span 3',
      gridColumnStart: 'two-start',
      gridColumnEnd: 'two-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridRow: '1/ span 3',
      gridColumnStart: 'four-start',
      gridColumnEnd: 'four-end'
    }
  }),

  authorName: ({ theme }) => ({
    gridRow: 1,
    alignSelf: 'center',
    marginBottom: 0,

    gridColumnStart: 'content-quarter',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end',
      alignSelf: 'self-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter',
      alignSelf: 'self-end'
    }
  }),

  authorSummaryWrap: ({ theme }) => ({
    display: 'flex',
    alignSelf: 'center',
    marginBottom: 0,

    gridRow: 2,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter'
    }
  }),

  authorSocialLinks: ({ theme }) => ({
    alignSelf: 'self-start',

    gridRow: 3,
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'seven-end'
    },

    [theme.breakpoints.up('lg')]: {
      gridColumnStart: 'five-start',
      gridColumnEnd: 'content-three-quarter'
    }
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
    padding: 'var(--grid-gap-double)',
    gridColumnStart: 'two-start',
    gridColumnEnd: 'eleven-end',
    gridRow: 1
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
