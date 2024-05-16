import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants,
  alpha
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Media'] = {
  nextImageOptimization: true,
  priority: false,
  sizes: '100vw' // All images are shown close to full bleed size
};

const styleOverrides: ComponentsOverrides<Theme>['Media'] = {
  // Set some static styles
  root: ({ theme, ownerState }) => ({
    // img default display: inline introduces a line-height space at the bottom
    'display': 'block',
    'maxWidth': `100%`,
    'height': 'auto',

    '&[class*=Media-embedWrap]': {
      position: 'relative',
      width: ' 100%',
      paddingBottom: '56.25%',
      overflow: 'hidden',
      display: 'block',

      iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none'
      }
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Media'] => [];

export const mediaTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Media: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default mediaTheme;
