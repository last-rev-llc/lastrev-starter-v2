import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

// import { ChatVariants } from './Chat.types';

const defaultProps: ComponentsProps['Chat'] = {
  chatWidth: '100%',
  chatHeight: '500px'
};

const styleOverrides: ComponentsOverrides<Theme>['Chat'] = {
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

    ...(ownerState?.chatHeight ? { height: ownerState.chatHeight } : { height: '100%' }),
    ...(ownerState?.chatWidth ? { width: ownerState.chatWidth } : { width: '100%' }),

    chat: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: 0
    }
  })
};

const createVariants = (theme: Theme): ComponentsVariants['Chat'] => [];

export const chatTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Chat: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default chatTheme;
