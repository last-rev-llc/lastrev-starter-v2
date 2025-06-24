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

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',

    // Document Manager variant - file browser style
    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      backgroundColor: 'var(--mui-palette-grey-50)',
      minHeight: '600px',
      borderRadius: 'var(--mui-shape-borderRadius)',
      border: '1px solid var(--mui-palette-divider)'
    }),

    // Timeline variant - vertical flow
    ...(ownerState?.variant === CollectionExpandableVariants.timeline && {
      backgroundColor: 'var(--mui-palette-background-default)',
      position: 'relative',
      paddingLeft: 'var(--grid-gap-double)'
    }),

    // FAQ variant - clean Q&A style
    ...(ownerState?.variant === CollectionExpandableVariants.faq && {
      backgroundColor: 'var(--mui-palette-background-default)',
      maxWidth: '800px',
      margin: '0 auto'
    })
  }),

  contentGrid: ({ theme, ownerState }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: 'var(--grid-gap)',
    alignItems: 'start',
    width: '100%',

    // Two column layout for variants with images
    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--grid-gap-double)',
      padding: 'var(--grid-gap-double)',
      '@container (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
        gap: 'var(--grid-gap)'
      }
    })
  }),

  itemsContainer: ({ ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--grid-gap-sm)',
    
    // Timeline gets special left border
    ...(ownerState?.variant === CollectionExpandableVariants.timeline && {
      position: 'relative',
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
    backgroundColor: 'var(--mui-palette-background-paper)',
    border: '1px solid var(--mui-palette-divider)',
    borderRadius: 'var(--mui-shape-borderRadius)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative',

    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      border: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
      borderBottom: '1px solid var(--mui-palette-divider)',
      '&:last-child': {
        borderBottom: 'none'
      }
    }),

    '&:hover': {
      boxShadow: ownerState?.variant === CollectionExpandableVariants.documentManager ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
    },

    '&[data-expanded="true"]': {
      backgroundColor: ownerState?.variant === CollectionExpandableVariants.documentManager ? 'var(--mui-palette-grey-50)' : 'var(--mui-palette-action-selected)',
      borderColor: ownerState?.variant === CollectionExpandableVariants.documentManager ? 'transparent' : 'var(--mui-palette-primary-main)'
    },

    // Timeline items get dots
    ...(ownerState?.variant === CollectionExpandableVariants.timeline && {
      marginLeft: 'var(--grid-gap)',
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

  itemHeader: ({ ownerState }) => ({
    padding: 'var(--grid-gap)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s ease',
    position: 'relative',

    ...(ownerState?.variant === CollectionExpandableVariants.documentManager && {
      padding: 'var(--grid-gap) 0',
      '& .MuiTypography-root': {
        fontSize: '1rem',
        fontWeight: 400
      }
    }),

    '&:hover': {
      backgroundColor: ownerState?.variant === CollectionExpandableVariants.documentManager ? 'transparent' : 'var(--mui-palette-action-hover)'
    },

    // Progress indicator for autoplay
    ...(ownerState?.autoPlay && ownerState?.showProgressIndicator && {
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

  itemContent: () => ({
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, padding 0.3s ease',
    
    '[data-expanded="true"] &': {
      maxHeight: '1000px', // Large enough for most content
      padding: 'var(--grid-gap)'
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

  imageContainer: ({ ownerState }) => ({
    position: 'relative',
    height: '100%',
    minHeight: '400px',
    overflow: 'hidden',
    borderRadius: 'var(--mui-shape-borderRadius)',
    backgroundColor: 'var(--mui-palette-grey-100)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

    '@container (max-width: 1024px)': {
      minHeight: '250px',
      marginTop: 'var(--grid-gap-double)'
    },

    // Only show for variants that support images
    ...(ownerState?.variant !== CollectionExpandableVariants.faq && {
      display: 'block'
    })
  }),

  sharedImage: () => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease',
    opacity: '0',

    '&[data-active="true"]': {
      opacity: '1'
    }
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
    flex: '1',
    height: '4px',
    backgroundColor: 'var(--mui-palette-grey-300)',
    borderRadius: '2px',
    position: 'relative',
    overflow: 'hidden',

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