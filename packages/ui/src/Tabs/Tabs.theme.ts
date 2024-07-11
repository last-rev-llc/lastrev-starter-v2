import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

export const defaultProps: ComponentsProps['Tabs'] = {
  orientation: 'vertical'
};

const styleOverrides: ComponentsOverrides<Theme>['Tabs'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  }),

  // introTextGrid: : {},

  introText: { gridColumn: 'content-start / content-end' },

  contentOuterGrid: {
    '> *': {
      gridColumnStart: 'auto'
    }
  },

  // tabsContext: {},
  tabListWrap: ({ ownerState, theme }) => ({
    'gridColumnStart': 'content-start',
    'gridColumnEnd': 'content-end',

    ...(ownerState?.orientation === 'vertical' && {
      gridColumnStart: 'content-start',
      gridColumnEnd: 'two-end',
      overflow: 'auto',
      maxHeight: '90vh',
      position: 'sticky',

      top: 0
    }),

    '.MuiTabs-flexContainer': {
      ...(ownerState?.orientation !== 'vertical' && {
        gap: 'var(--grid-gap)'
      })
    },

    '.MuiTab-root': {
      ...theme.typography.h6,
      marginBottom: 0,
      borderBottomWidth: '0',
      borderBottomStyle: 'solid',
      paddingRight: 0,
      paddingLeft: 0,
      textTransform: 'initial',
      opacity: 0.5,

      ...(ownerState?.orientation === 'vertical'
        ? {
            '&': {
              textAlign: 'left',
              alignItems: 'flex-start',
              padding: 'var(--grid-gap-quarter) 0'
            }
          }
        : {
            maxWidth: '25%'
          })
    },

    '.Mui-selected': {
      opacity: 1,
      fontWeight: 700,
      color: 'currentColor'
    }
  }),

  detailsWrap: ({ ownerState, theme }) => ({
    gridColumnStart: 'content-start',
    gridColumnEnd: 'content-end',
    padding: 'var(--grid-gap) 0',

    ...(ownerState?.orientation === 'vertical' && {
      gridColumnStart: 'three-start',
      gridColumnEnd: 'content-end',
      padding: 0
    })
  })

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
