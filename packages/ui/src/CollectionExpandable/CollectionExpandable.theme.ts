import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionExpandableVariants } from './CollectionExpandable.types';

const defaultProps: ComponentsProps['CollectionExpandable'] = {
  autoPlay: false,
  autoPlayInterval: 5000,
  showProgressIndicator: true,
  expandMultiple: false,
  defaultExpanded: 0,
  fadeTransition: true
};

const styleOverrides: ComponentsOverrides<Theme>['CollectionExpandable'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    minHeight: '100vh',
    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 'var(--grid-gap-double) 0'
  }),

  contentGrid: () => ({}),

  itemsContainer: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap-sm)',
    marginTop: theme.spacing(5)
  }),

  item: () => ({
    borderBottom: '1px solid var(--mui-palette-divider)',
    transition: 'all 0.3s ease'
  }),

  itemHeader: ({ ownerState, theme }) => ({
    padding: theme.spacing(2, 0),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',

    '& .MuiTypography-root': {
      fontSize: '1.125rem',
      fontWeight: 500
    },

    ...(ownerState?.autoPlay &&
      ownerState?.showProgressIndicator && {
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          backgroundColor: 'var(--mui-palette-primary-main)',
          width: '0%'
        },
        '&[data-active="true"]::after': {
          width: '100%',
          transition: `width ${ownerState.autoPlayInterval || 5000}ms linear`
        }
      })
  }),

  itemContent: ({ theme }) => ({
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
    padding: theme.spacing(0, 2),

    '[data-expanded="true"] &': {
      maxHeight: '1000px'
    }
  }),

  expandIcon: () => ({
    width: '24px',
    height: '24px',
    transition: 'transform 0.3s ease',

    '[data-expanded="true"] &': {
      transform: 'rotate(180deg)'
    }
  }),

  imageContainer: () => ({
    height: '100%',
    gridColumn: 'seven-start / end',

    '@container (max-width: 1024px)': {
      minHeight: '250px',
      marginTop: 'var(--grid-gap-double)',
      gridColumn: 'start / end'
    }
  }),

  introTextWrap: () => ({}),

  introText: () => ({}),

  leftColumn: () => ({
    gridColumn: 'start / five-end'
  }),

  progressIndicator: () => ({
    display: 'flex',
    gap: 'var(--grid-gap-sm)',
    justifyContent: 'center',
    padding: 'var(--grid-gap)',
    marginTop: 'var(--grid-gap)'
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['CollectionExpandable'] => [];

const collectionExpandableTheme = (theme: Theme): ThemeOptions => ({
  components: {
    CollectionExpandable: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionExpandableTheme;
