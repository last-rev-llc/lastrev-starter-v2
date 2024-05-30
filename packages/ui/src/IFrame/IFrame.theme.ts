import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

// import { IFrameVariants } from './IFrame.types';

const defaultProps: ComponentsProps['IFrame'] = {};

const styleOverrides: ComponentsOverrides<Theme>['IFrame'] = {
  root: ({ theme, ownerState }) => ({
    '> *': {
      paddingTop: 'var(--grid-gap-double)',
      paddingBottom: 'var(--grid-gap-double)',
      border: 'none'
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['IFrame'] => [];

export const iframeTheme = (theme: Theme): ThemeOptions => ({
  components: {
    IFrame: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default iframeTheme;
