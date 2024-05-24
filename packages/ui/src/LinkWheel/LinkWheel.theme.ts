import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['LinkWheel'] = {};

const styleOverrides: ComponentsOverrides<Theme>['LinkWheel'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    'containerType': 'inline-size',
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'position': 'relative',

    '[class*=MuiResponsiveChart-container]': {
      width: '100%',
      height: '100%'
    },

    'text': {
      ...theme.typography.h3
    }
  }),

  contentGrid: {
    gridGap: 0
  },

  pieChartWrap: {
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '50vh',
    margin: '0 auto',
    // minHeight: '800px',
    position: 'relative'
  }
};

const createVariants = (_theme: Theme): ComponentsVariants['LinkWheel'] => [];

const linkwheelTheme = (theme: Theme): ThemeOptions => ({
  components: {
    LinkWheel: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default linkwheelTheme;
