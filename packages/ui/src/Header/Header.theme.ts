import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

const menuMobileBreakpoint = 'md';

const defaultProps: ComponentsProps['Header'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Header'] = {
  root: ({ theme, ownerState, menuVisible }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'position': 'relative',
    'padding': theme.spacing(2.5, 0),
    'width': '100%',
    'zIndex': 100,
    'gap': 0,

    [theme.breakpoints.down(menuMobileBreakpoint)]: {
      position: 'sticky',
      top: 0,
      ...(!!menuVisible && { height: '100vh' })
    },

    '& *': {
      'whiteSpace': 'nowrap',

      '&:is([class*=MuiListItem-root], [class*=MuiList-root])': {
        ...theme.mixins.applyBackgroundColor({ ownerState, theme })
      }
    }
  }),

  contentOuterGrid: ({ theme, menuVisible }) => ({
    rowGap: 0,

    [theme.breakpoints.down(menuMobileBreakpoint)]: {
      ...(!!menuVisible && {
        rowGap: 'var(--grid-gap-half)',
        gridTemplateRows: 'auto 1fr auto'
      }),

      height: 'inherit'
    }
  }),

  logoRoot: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'three-end',
    gridRow: 1,
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
    display: 'block',

    [theme.breakpoints.up('md')]: {
      gridColumnEnd: 'half'
    },

    [theme.breakpoints.up('lg')]: {
      gridRow: 1,
      gridColumnEnd: 'three-quarter'
    }
  }),

  logo: ({ theme }) => ({
    position: 'relative',
    zIndex: '100'
  }),
  
  headerMenuCtas: ({ theme }) => ({
    'padding': 0,
    'display': 'inline-flex',
    'justifyContent': 'space-between',
    'alignItems': 'center',
    'height': 'auto',
    'justifySelf': 'flex-end',
    'gridRow': 3,
    'margin': 'auto',

    '& *': {
      ...theme.typography.bodyXSmall
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      height: '100%',
      marginRight: 'unset',
      gridColumnStart: 'three-quarter',
      gridColumnEnd: 'end',
      justifyContent: 'flex-end',
      gap: 'var(--grid-gap)',
      gridRow: 1
    }
  }),

  headerMobileNavWrap: ({ theme, menuVisible }) => ({
    gridRow: 2,
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    maxHeight: '100vh',
    overflow: 'hidden',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    transition: 'max-height 500ms ease',
    // borderBottom: `solid 2px ${theme.vars.palette.primary.main}`,
    paddingTop: 'var(--grid-gap)',
    paddingBottom: 'var(--grid-gap)',
    gap: 'var(--grid-gap)',

    [theme.breakpoints.down(menuMobileBreakpoint)]: {
      marginBottom: 'var(--grid-gap)',

      ...(!menuVisible && {
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomColor: 'transparent',
        marginBottom: 0
      })
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      display: 'contents'
    }
  }),

  headerMenuCtaItem: {
    padding: 0,
    justifyContent: 'center'
  },

  headerMenuNav: ({ theme }) => ({
    'justifyItems': 'center',
    'justifyContent': 'flex-end',
    'position': 'unset',
    'display': 'inline-flex',

    '& a': {
      whiteSpace: 'nowrap',
      color: 'inherit',
      ...theme.typography.body1
    },

    [theme.breakpoints.down('md')]: {
      overflowY: 'auto',
      overflowX: 'hidden',
      maxHeight: '75vh !important',

      height: '100%'
    },

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start',
      height: 'auto',
      overflow: 'unset',
      maxHeight: '100%',
      gridRow: 1,
      gridColumnStart: 'start',
      gridColumnEnd: 'end'
    },

    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),

  iconButtonWrap: ({ theme }) => ({
    'padding': 0,
    'display': 'flex',
    'gridColumnStart': 'half',
    'gridColumnEnd': 'end',
    'gridRow': 1,
    'justifyContent': 'flex-end',

    '& *': {
      fill: 'var(--mui-palette-text-primary) !important'
    },

    '& > *': {
      paddingTop: 0,
      paddingBottom: 0
    },

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      display: 'none'
    }
  }),

  menuIcon: ({ menuVisible }) => ({
    display: menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  closeIcon: ({ menuVisible }) => ({
    display: !menuVisible ? 'none' : 'block',
    fontSize: 42
  }),

  searchCloseIcon: ({ theme }) => ({
    fontSize: 42,
    color: 'inherit',
    position: 'fixed',
    top: 'var(--grid-gap)',
    right: 'var(--grid-gap)'
  }),

  searchIcon: ({ theme }) => ({
    fontSize: 42,
    color: 'inherit'
  }),

  headerMenuNavItems: ({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--grid-gap) var(--grid-gap-double) 0 0',
    position: 'unset',
    flexDirection: 'column',
    width: '100%',
    margin: '0 auto',
    gap: 'calc(3 * var(--grid-gap))',
    fontWeight: 700,
    justifySelf: 'flex-start',

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      'padding': 0,
      'height': '100%',
      'flexDirection': 'row',
      'width': 'auto',
      'gap': 'var(--grid-gap)',
      'margin': 'auto',

      '& > *:last-child a': {
        paddingRight: 0
      }
    }
  }),

  headerMenuNavItem: ({ theme }) => ({
    padding: 0,
    position: 'unset',
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      height: '100%'
    }
  }),

  autoCompleteWrap: ({ ownerState, theme }) => ({
    height: '100vh',
    width: '100vw',
    top: 0,
    left: 0,
    position: 'fixed',
    zIndex: 100000,

    ...theme.mixins.applyColorSchemeOverlay({ ownerState, theme }),

    backgroundColor: alpha(theme.palette.primary.main, 0.95),
    padding: 'var(--section-padding) 0',

    [theme.breakpoints.up(menuMobileBreakpoint)]: {
      padding: 'calc(2 * var(--section-padding)) 0'
    }
  }),

  autoCompleteInnerWrap: ({ ownerState, theme }) => ({
    gridColumnStart: 'full-start',
    gridColumnEnd: 'full-end',

    [theme.breakpoints.up('sm')]: {
      gridColumnStart: 'start',
      gridColumnEnd: 'end'
    },

    [theme.breakpoints.only('sm')]: {
      '@media screen and (orientation:landscape)': {
        '& [class*=Card-root]:nth-child(n+3)': {
          display: 'none'
        }
      }
    },

    [theme.breakpoints.up('md')]: {
      gridColumnStart: 'two-start',
      gridColumnEnd: 'eleven-end'
    },

    [theme.breakpoints.down('md')]: {
      '& [class*=Card-root]:nth-child(n+5)': {
        display: 'none'
      }
    },

    [theme.breakpoints.down('sm')]: {
      '& [class*=Card-root]:nth-child(n+4)': {
        display: 'none'
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Header'] => [];

export const headerTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Header: {
      // @ts-expect-error
      height: 80,
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerTheme;
