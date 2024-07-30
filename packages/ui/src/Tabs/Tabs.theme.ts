import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { type Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Tabs'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Tabs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: `var(--section-padding) 0`
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'start / end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  // tabsContext: {},
  tabListWrap: ({ theme }) => ({
    'gridColumnStart': 'start',
    'gridColumnEnd': 'end',
    '.MuiTabs-flexContainer': { gap: 'var(--grid-gap)' },

    '.MuiTab-root': {
      borderBottomWidth: '0',
      borderBottomStyle: 'solid',
      paddingRight: 'calc(3 * var(--grid-gap))',
      paddingLeft: 0,
      whiteSpace: 'nowrap',
      opacity: 0.5,
      ...theme.typography.h4
    },

    '.Mui-selected': {
      opacity: 1,
      fontWeight: 700,
      color: 'currentColor'
    }
  }),

  detailsWrap: {
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    padding: 'var(--section-padding) 0'
  }
  // details: {}
};

const createVariants = (theme: Theme): ComponentsVariants['Tabs'] => [];

export const TabsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Tabs: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default TabsTheme;
