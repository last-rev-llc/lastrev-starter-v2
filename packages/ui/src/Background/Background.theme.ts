import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Background'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Background'] = {
  root: ({ theme, ownerState }) => ({
    // Use grid layout to match content structure
    'zIndex': -1,
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'width': '100%',
    'height': '100%',
    'display': 'grid',
    'gridTemplateColumns': 'var(--grid-template-columns)',
    'gridTemplateRows': 'var(--grid-template-rows)',
    'gap': 'var(--grid-gap)',
    
    // Pseudo-element for actual background
    '&::before': {
      content: '""',
      gridColumn: 'start / end',
      gridRow: '1 / -1',
      zIndex: -1,
      ...theme.mixins.applyBackgroundColor({ ownerState, theme })
    },

    '> *': {
      'gridColumn': 'full-start/full-end',
      'height': '100%',
      'width': '100%',
      '&:is(img)': {
        objectFit: 'cover',
        objectPosition: ' center center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)'
      }
    }
  })
};

export const backgroundTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Background: {
      defaultProps,
      styleOverrides
    }
  }
});

export default backgroundTheme;
