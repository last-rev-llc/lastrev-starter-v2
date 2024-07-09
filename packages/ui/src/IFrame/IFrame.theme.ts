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
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    'containerType': 'inline-size',
    'position': 'relative',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    '[class*="Background-root"] + [class*=Section-contentWrap] & [class*=mainContentWrap]': {
      padding: 'var(--grid-gap)',
      paddingTop: 0
    }
  }),

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  introText: { gridColumn: 'content-start / content-end' },

  mainContentWrap: ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '250px',
    maxHeight: '80vh',
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    margin: 'auto',

    ...(ownerState?.iFrameHeight ? { height: ownerState.iFrameHeight } : { height: '100%' }),
    ...(ownerState?.iFrameWidth ? { width: ownerState.iFrameWidth } : { width: '100%' }),

    iframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: 0
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
