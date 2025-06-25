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
    width: '100%',
    position: 'relative',
    padding: 'var(--grid-gap-double) 0'
  }),

  contentGrid: ({ theme, ownerState }) => ({
    position: 'relative'
  }),

  itemsContainer: ({ ownerState, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap-sm)',
    marginTop: theme.spacing(5),
    // Timeline gets special left border
    ...(ownerState?.variant === CollectionExpandableVariants.timeline && {
      'position': 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '-24px',
        top: '0',
        bottom: '0',
        width: '2px',
        backgroundColor: 'var(--mui-palette-primary-main)'
      }
    })
  }),

  item: ({ ownerState }) => ({
    'backgroundColor': 'var(--mui-palette-background-paper)',
    'border': '1px solid var(--mui-palette-divider)',
    'borderRadius': 'var(--mui-shape-borderRadius)',
    'overflow': 'hidden',
    'transition': 'all 0.3s ease',
    'position': 'relative',

    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      'border': 'none',
      'borderRadius': 0,
      'backgroundColor': 'transparent',
      'borderBottom': '1px solid var(--mui-palette-divider)',
      '&:last-child': {
        borderBottom: 'none'
      }
    }),

    ...(ownerState?.variant === CollectionExpandableVariants.accordionShowcase && {
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
      borderBottom: '1px solid var(--mui-palette-divider)'
    }),

    '&:hover': {
      boxShadow:
        ownerState?.variant === CollectionExpandableVariants.documentManager ||
        ownerState?.variant === CollectionExpandableVariants.accordionShowcase
          ? 'none'
          : '0 2px 8px rgba(0,0,0,0.1)'
    },

    '&[data-expanded="true"]': {
      backgroundColor:
        ownerState?.variant === CollectionExpandableVariants.documentManager ||
        ownerState?.variant === CollectionExpandableVariants.accordionShowcase
          ? 'transparent'
          : 'var(--mui-palette-action-selected)',
      borderColor:
        ownerState?.variant === CollectionExpandableVariants.documentManager ||
        ownerState?.variant === CollectionExpandableVariants.accordionShowcase
          ? 'transparent'
          : 'var(--mui-palette-primary-main)'
    },

    // Timeline items get dots
    ...(ownerState?.variant === CollectionExpandableVariants.timeline && {
      'marginLeft': 'var(--grid-gap)',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '-32px',
        top: '24px',
        width: '12px',
        height: '12px',
        backgroundColor: 'var(--mui-palette-primary-main)',
        borderRadius: '50%',
        border: '3px solid var(--mui-palette-background-default)'
      },
      '&[data-expanded="true"]::before': {
        backgroundColor: 'var(--mui-palette-primary-dark)',
        transform: 'scale(1.2)'
      }
    })
  }),

  itemHeader: ({ ownerState, theme }) => ({
    'padding': theme.spacing(2, 0),
    'cursor': 'pointer',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    'transition': 'background-color 0.2s ease',
    'position': 'relative',

    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      // 'padding': 'var(--grid-gap) 0',
      '& .MuiTypography-root': {
        fontSize: '1rem',
        fontWeight: 400
      }
    }),

    ...(ownerState?.variant === CollectionExpandableVariants.accordionShowcase && {
      // 'padding': 'var(--grid-gap-double) 0',
      '& .MuiTypography-root': {
        margin: 0,
        fontSize: '1.125rem',
        fontWeight: 500
      }
    }),

    '&:hover': {
      backgroundColor:
        ownerState?.variant === CollectionExpandableVariants.documentManager ||
        ownerState?.variant === CollectionExpandableVariants.accordionShowcase
          ? 'transparent'
          : 'var(--mui-palette-action-hover)'
    },

    // Progress indicator for autoplay
    ...(ownerState?.autoPlay &&
      ownerState?.showProgressIndicator && {
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '0',
          height: '2px',
          backgroundColor: 'var(--mui-palette-primary-main)',
          transition: 'width linear',
          width: '0%'
        },
        '&[data-active="true"]::after': {
          width: '100%',
          transitionDuration: `${ownerState.autoPlayInterval || 5000}ms`
        }
      })
  }),

  itemContent: ({ theme }) => ({
    'maxHeight': '0',
    'overflow': 'hidden',
    'transition': 'max-height 0.3s ease, padding 0.3s ease',
    'padding': theme.spacing(0, 2),

    '[data-expanded="true"] &': {
      maxHeight: '1000px' // Large enough for most content
    }
  }),

  expandIcon: () => ({
    'width': '24px',
    'height': '24px',
    'transition': 'transform 0.3s ease',

    '[data-expanded="true"] &': {
      transform: 'rotate(180deg)'
    }
  }),

  imageContainer: ({ ownerState }) => ({
    'position': 'relative',
    'height': '100%',
    'overflow': 'hidden',
    'borderRadius': 'var(--mui-shape-borderRadius)',
    'backgroundColor': 'var(--mui-palette-grey-100)',
    'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

    // Grid positioning for two-column layouts
    'gridColumn': 'start / end', // Default full width

    ...((ownerState?.variant === CollectionExpandableVariants.documentManager ||
      ownerState?.variant === CollectionExpandableVariants.accordionShowcase) && {
      gridColumn:
        ownerState?.variant === CollectionExpandableVariants.accordionShowcase
          ? 'seven-start / end' // 7 columns for accordionShowcase
          : 'seven-start / end' // 6 columns (second half) for documentManager
    }),

    '@container (max-width: 1024px)': {
      minHeight: '250px',
      marginTop: 'var(--grid-gap-double)',
      position: 'relative',
      top: 'unset',
      gridColumn: 'start / end'
    },

    // Only show for variants that support images
    ...(ownerState?.variant !== CollectionExpandableVariants.faq && {
      display: 'block'
    })
  }),

  sharedImage: () => ({
    'position': 'absolute',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'objectFit': 'contain',
    'transition': 'opacity 0.5s ease',
    'opacity': '0',

    '&[data-active="true"]': {
      opacity: '1'
    }
  }),

  // Intro text wrapper
  introTextWrap: ({ ownerState }) => ({
    // For two-column layouts where intro text should be positioned separately
    ...((ownerState?.variant === CollectionExpandableVariants.documentManager ||
      ownerState?.variant === CollectionExpandableVariants.accordionShowcase) && {
      'gridColumn': 'span 1',
      '@container (max-width: 768px)': {
        gridColumn: '1 / -1'
      }
    })
  }),

  // Intro text content
  introText: () => ({}),

  // Left column for two-column layouts
  leftColumn: ({ ownerState }) => ({
    // Default - full width
    gridColumn: 'start / five-end'
  }),

  itemImage: () => ({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
    marginBottom: 'var(--grid-gap-sm)'
  }),

  progressIndicator: () => ({
    display: 'flex',
    gap: 'var(--grid-gap-sm)',
    justifyContent: 'center',
    padding: 'var(--grid-gap)',
    marginTop: 'var(--grid-gap)'
  }),

  progressBar: () => ({
    'flex': '1',
    'height': '4px',
    'backgroundColor': 'var(--mui-palette-grey-300)',
    'borderRadius': '2px',
    'position': 'relative',
    'overflow': 'hidden',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      backgroundColor: 'var(--mui-palette-primary-main)',
      borderRadius: '2px',
      transition: 'width linear',
      width: '0%'
    },

    '&[data-active="true"]::before': {
      width: '100%'
    }
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
