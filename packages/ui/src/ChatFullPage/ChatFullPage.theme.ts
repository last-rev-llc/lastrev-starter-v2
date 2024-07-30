import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

// import { ChatFullPageVariants } from './ChatFullPage.types';

const defaultProps: ComponentsProps['ChatFullPage'] = {
  chatFullPageWidth: '100%',
  chatFullPageHeight: '500px'
};

const styleOverrides: ComponentsOverrides<Theme>['ChatFullPage'] = {
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

  introText: { gridColumn: 'start / end' },

  mainContentWrap: ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '250px',
    maxHeight: '80vh',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    margin: 'auto',

    ...(ownerState?.chatFullPageHeight
      ? { height: ownerState.chatFullPageHeight }
      : { height: '100%' }),
    ...(ownerState?.chatFullPageWidth
      ? { width: ownerState.chatFullPageWidth }
      : { width: '100%' }),

    chatFullPage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: 0
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['ChatFullPage'] => [];

export const chatFullPageTheme = (theme: Theme): ThemeOptions => ({
  components: {
    ChatFullPage: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default chatFullPageTheme;
