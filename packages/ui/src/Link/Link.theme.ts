import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ ownerState, theme }) => ({
    'display': 'inline-flex',
    // 'textTransform': 'unset',
    'alignItems': 'center',
    'textAlign': 'center',
    ...(!!ownerState?.variant
      ? {
          color: 'var(--mui-palette-text-primary, inherit)'
        }
      : {}),

    ...(ownerState?.variant?.includes('Contained') && {
      'backgroundColor': 'var(--mui-palette-primary-main)',
      'color': 'var(--mui-palette-primary-contrastText)',
      '--mui-palette-Button-inheritContainedHoverBg': 'var(--mui-palette-primary-dark)'
    }),

    ...(ownerState?.variant?.includes('iconBadge') && {
      'border': 'none',
      'padding': 0,
      // 'borderRadius': 'unset',
      'height': '40px',

      '& svg': {
        width: 'auto',
        height: '40px'
      },

      [theme.breakpoints.up('md')]: {
        'height': '50px',

        '& svg': {
          height: '50px'
        }
      }
    }),

    // ...(ownerState?.variant?.includes('Outlined') && {
    //   color: 'var(--mui-palette-primary-main)',
    //   borderColor: 'var(--mui-palette-primary-main)'
    // }),

    // TODO: Discuss but this helps to do a label
    'textDecorationColor': 'currentColor',
    'textDecoration': 'none!important',
    '&:hover': {
      textDecoration: 'underline!important'
    },

    '&[href="#"]': {
      textDecoration: 'none!important',
      color: 'var(--mui-palette-text-primary)!important'
    },

    // TODO: Review, looks out of place but allows for any icon color controlled from Link color
    // TODO Add variant
    // TODO Really review this weird stuff, supports color inversion as well as explicit color on the link

    ...(ownerState?.icon
      ? {
          'backgroundColor': 'transparent',
          '.fill-primary': {
            fill: `var(--mui-palette-${ownerState?.color ?? 'primary'}-main)`
          },
          '.fill-secondary': {
            fill: `var(--mui-palette-${
              ownerState?.color ? ownerState?.color + '-contrastText' : 'secondary-main'
            })`
          }
        }
      : null)
  }),

  rootButton: {
    display: 'inline-flex',
    alignItems: 'center'
  },

  // rootLink: : {},

  // rootMuiLink: : {},

  // rootIconButton: : {},

  noLinkStyleIcon: ({ theme, iconPosition }) => ({
    margin: iconPosition === 'Left' ? `0 ${theme.spacing(1)} 0 0` : `0 0 0 ${theme.spacing(1)}`
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Link'] => [
  {
    props: {
      variant: 'link'
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: 'default'
    },
    style: {
      textDecoration: 'underline'
    }
  },
  {
    props: {
      variant: 'buttonText'
    },
    style: {
      textDecoration: 'underline'
      // textTransform: 'unset'
    }
  }
];

export const LinkTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Link: {
      defaultProps,

      styleOverrides,
      variants: createVariants(theme)
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase'
        }
      }
    }
  }
});

export default LinkTheme;
