import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['HeaderNavLink'] = {};

const styleOverrides: ComponentsOverrides<Theme>['HeaderNavLink'] = {
  root: ({ theme }) => ({
    ...theme.typography.body,

    'display': 'flex',
    'flexDirection': 'column',
    'flexGrow': '1',

    [theme.breakpoints.up('md')]: {
      height: '100%'
    },

    '&:is(:hover, :focus, :focus-within):not(:focus-visible)': {
      '[class*="HeaderNavLink-navItemLink"]': {
        // 'fontWeight': 800,
        'color': theme.vars.palette.highlightColor,
        'textDecoration': 'none!important',
        '.MuiSvgIcon-root': {
          transform: 'rotate(-90deg)'
        }
      },

      '[class*="HeaderNavLink-navItemSubMenu"]': {
        visibility: 'visible',
        opacity: 1
      }
    }
  }),

  navItemLink: ({ theme, open }) => ({
    'flexGrow': '1',
    'alignItems': 'center',
    'display': 'inline-flex',
    'width': '100%',
    'justifyContent': 'space-between',
    'cursor': 'pointer',
    'height': '100%',

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1),
      justifyContent: 'flex-start',
      marginTop: 'calc(-1 * var(--grid-gap)) !important',
      marginBottom: 'calc(-1 * var(--grid-gap)) !important'
    },

    // TODO: Standardizxe this across the header links if they're the same
    '.MuiSvgIcon-root': {
      fill: theme.vars.palette.primary.main,
      width: 'auto',
      height: theme.spacing(2),
      marginLeft: 'var(--grid-gap-half)',
      transform: 'rotate(90deg)',
      transition:
        'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

      ...(!!open && {
        [theme.breakpoints.down('md')]: {
          transform: 'rotate(-90deg)'
        }
      }),

      [theme.breakpoints.up('md')]: {
        height: '10px',
        fill: theme.vars.palette.primary.main
      }
    }
  }),

  navItemSubMenu: ({ theme, ownerState, open }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    display: 'grid',
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    rowGap: 0,
    columnGap: 'var(--grid-gap)',
    padding: 0,
    width: '100%',
    transition: 'max-height 500ms ease, opacity 500ms ease',

    [theme.breakpoints.down('md')]: {
      maxHeight: '100%',
      overflow: 'hidden',
      ...(!open && { maxHeight: 0 })
    },

    [theme.breakpoints.up('md')]: {
      visibility: 'hidden',
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 1,
      opacity: 0,
      // borderTop: 'solid 2px yellow',
      transform: 'translateY(100%)',
      padding: `var(--grid-gap-half) var(--grid-margin)`,
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
    }
  }),

  navItemSubMenuItem: ({ theme }) => ({
    '& > a': {
      ...theme.typography.body1
    },
    '[class*=rootLinkIcon] *': {
      marginLeft: 8,
      fontSize: 10
    },
    // '& > * *': {
    //   ...theme.typography.navLink
    // },

    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['HeaderNavLink'] => [];

export const headerNavLinkTheme = (theme: Theme): ThemeOptions => ({
  components: {
    HeaderNavLink: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default headerNavLinkTheme;
