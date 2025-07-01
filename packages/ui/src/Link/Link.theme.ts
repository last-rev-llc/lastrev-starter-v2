import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Link'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Link'] = {
  root: ({ ownerState }) => ({
    'display': 'inline-flex',
    'alignItems': 'center',
    'textAlign': 'center',
    // 'textDecorationColor': 'currentColor',
    'textDecoration': 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
    // ...(!!ownerState?.variant
    //   ? {
    //       color: 'var(--mui-palette-text-primary, inherit)'
    //     }
    //   : {})
  }),

  rootButton: {
    display: 'inline-flex',
    alignItems: 'center'
  },

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
  }
];

export const LinkTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Link: {
      defaultProps,

      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default LinkTheme;
