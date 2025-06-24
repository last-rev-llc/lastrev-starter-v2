import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { CollectionVariants } from './Collection.types';
import { type LayoutConfig } from '../ThemeRegistry/mixins/generateGridStyles';

const defaultProps: ComponentsProps['Collection'] = {};

export const layoutConfig: LayoutConfig = {
  [CollectionVariants.onePerRow]: {
    xs: 1,
    sm: 2,
    md: 1,
    lg: 1,
    xl: 1
  },
  [CollectionVariants.twoPerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 2
  },
  [CollectionVariants.threePerRow]: {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3
  },
  [CollectionVariants.fourPerRow]: {
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4
  },
  [CollectionVariants.fivePerRow]: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 5,
    xl: 5
  },
  [CollectionVariants.splitLayout]: {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1
  },
  [CollectionVariants.accordionShowcase]: {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1
  },
  [CollectionVariants.featureShowcase]: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3
  }
};

const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',

    // Logo carousel variant
    ...(ownerState?.variant === CollectionVariants.logos && {
      padding: 'var(--grid-gap-double) 0',
      backgroundColor: 'var(--mui-palette-background-default)',
      overflow: 'hidden'
    }),

    // CTA variant
    ...(ownerState?.variant === CollectionVariants.cta && {
      'backgroundColor': 'var(--mui-palette-primary-main)',
      'backgroundImage':
        'linear-gradient(135deg, var(--mui-palette-primary-dark) 0%, var(--mui-palette-primary-main) 100%)',
      'color': 'var(--mui-palette-common-white)',
      'minHeight': '600px',
      '@container (max-width: 1024px)': {
        minHeight: '500px'
      },
      '@container (max-width: 580px)': {
        minHeight: '400px'
      }
    }),

    // Testimonial variant - carousel container
    ...(ownerState?.variant === CollectionVariants.testimonial && {
      backgroundColor: 'var(--mui-palette-grey-900)',
      color: 'var(--mui-palette-common-white)',
      overflow: 'hidden'
    }),

    // Three per row variant - can be carousel
    ...(ownerState?.variant === CollectionVariants.threePerRow && {
      overflow: 'hidden'
    }),

    // Split Layout variant - two column layout with intro on left, items on right
    ...(ownerState?.variant === CollectionVariants.splitLayout && {
      backgroundColor: 'var(--mui-palette-background-default)',
      padding: 'var(--grid-gap-double) 0'
    }),

    // Accordion Showcase variant - 50-50 layout handled by CollectionExpandable
    ...(ownerState?.variant === CollectionVariants.accordionShowcase && {
      backgroundColor: 'var(--mui-palette-background-default)',
      padding: 'var(--grid-gap-double) 0'
    }),

    // Feature Showcase variant - feature grid
    ...(ownerState?.variant === CollectionVariants.featureShowcase && {
      backgroundColor: 'var(--mui-palette-background-default)',
      padding: 'var(--grid-gap-double) 0'
    })
  }),

  // Navigation controls for carousel variants
  contentGrid: ({ theme, ownerState }) => ({
    position: 'relative',

    // Split Layout - apply grid system for intro + items layout
    // ...(ownerState?.variant === CollectionVariants.splitLayout && {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(12, 1fr)',
    //   gap: 'var(--grid-gap)',
    //   alignItems: 'start',
    //   maxWidth: 'var(--grid-max-width, 1200px)',
    //   margin: '0 auto',
    //   padding: '0 var(--grid-gap)'
    // }),

    // Navigation arrows for carousel variants
    ...((ownerState?.variant === CollectionVariants.logos ||
      ownerState?.variant === CollectionVariants.testimonial ||
      ownerState?.variant === CollectionVariants.threePerRow) && {
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '48px',
        height: '48px',
        backgroundColor: 'var(--mui-palette-background-paper)',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      },
      '&::before': {
        left: '-24px',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' fill='%23282E37'/%3E%3C/svg%3E\")",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '24px'
      },
      '&::after': {
        right: '-24px',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z' fill='%23282E37'/%3E%3C/svg%3E\")",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '24px'
      },
      '&::before:hover, &::after:hover': {
        backgroundColor: 'var(--mui-palette-grey-100)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      },
      '@container (max-width: 580px)': {
        '&::before, &::after': {
          display: 'none' // Hide arrows on mobile, rely on swipe
        }
      }
    }),

    // Pagination dots for testimonial carousel
    ...(ownerState?.variant === CollectionVariants.testimonial && {
      '&::after': {
        content: 'none' // Remove arrow, dots will be in separate element
      }
    })
  }),

  itemsGrid: ({ theme, ownerState }) => ({
    gridColumn: 'start/end',
    gap: 'inherit',
    alignItems: 'stretch',

    // Logos variant - horizontal carousel/scroll
    ...(ownerState?.variant === CollectionVariants.logos && {
      'display': 'flex',
      'overflowX': 'auto',
      'scrollBehavior': 'smooth',
      'scrollSnapType': 'x mandatory',
      'gap': 'var(--grid-gap-lg)',
      'paddingBottom': 'var(--grid-gap)', // Space for scroll indicator
      '&::-webkit-scrollbar': {
        height: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'var(--mui-palette-grey-200)',
        borderRadius: '4px'
      },
      '&::-webkit-scrollbar-thumb': {
        'background': 'var(--mui-palette-grey-400)',
        'borderRadius': '4px',
        '&:hover': {
          background: 'var(--mui-palette-grey-500)'
        }
      },
      '@container (max-width: 1024px)': {
        gap: 'var(--grid-gap-md)'
      },
      '@container (max-width: 580px)': {
        gap: 'var(--grid-gap-sm)',
        scrollSnapType: 'x proximity' // More flexible on mobile
      }
    }),

    // CTA variant - special layout
    ...(ownerState?.variant === CollectionVariants.cta && {
      'display': 'flex',
      'flexDirection': 'row',
      'alignItems': 'center',
      'padding': 'var(--grid-gap-double)',
      'gap': 'var(--grid-gap-double)',
      '@container (max-width: 1024px)': {
        flexDirection: 'column',
        textAlign: 'center'
      },
      '@container (max-width: 580px)': {
        padding: 'var(--grid-gap)'
      }
    }),

    // Testimonial variant - carousel with snap points
    ...(ownerState?.variant === CollectionVariants.testimonial && {
      'display': 'flex',
      'overflowX': 'hidden', // Hidden by default, JS will handle navigation
      'scrollBehavior': 'smooth',
      'scrollSnapType': 'x mandatory',
      'gap': 'var(--grid-gap-lg)',
      'position': 'relative',
      '&[data-scrollable="true"]': {
        'overflowX': 'auto',
        '@container (max-width: 580px)': {
          scrollSnapType: 'x proximity'
        }
      }
    }),

    // Three per row - can be carousel or grid
    ...(ownerState?.variant === CollectionVariants.threePerRow && {
      // Default grid layout
      ...theme.mixins.generateGridStyles({
        theme,
        layoutConfig,
        variant: CollectionVariants.threePerRow,
        defaultVariant: 'default'
      }),
      // Carousel mode when enabled
      '&[data-carousel="true"]': {
        'display': 'flex',
        'overflowX': 'hidden',
        'scrollBehavior': 'smooth',
        'scrollSnapType': 'x mandatory',
        'gridTemplateColumns': 'none',
        'gap': 'var(--grid-gap-lg)',
        '@container (max-width: 580px)': {
          overflowX: 'auto',
          scrollSnapType: 'x proximity'
        }
      }
    }),

    // Split Layout variant - items grid spans columns 7-12
    ...(ownerState?.variant === CollectionVariants.splitLayout && {
      'gridColumn': 'seven-start/end',
      'display': 'flex',
      'flexDirection': 'column',
      'gap': 'var(--grid-gap-sm)',
      '@container (max-width: 768px)': {
        gridColumn: '1 / -1'
        // marginTop: 'var(--grid-gap)'
      }
    }),

    // Feature Showcase variant - feature grid
    ...(ownerState?.variant === CollectionVariants.featureShowcase && {
      ...theme.mixins.generateGridStyles({
        theme,
        layoutConfig,
        variant: CollectionVariants.featureShowcase,
        defaultVariant: 'default'
      }),
      maxWidth: '1200px',
      margin: '0 auto',
      gap: 'var(--grid-gap-lg)'
    }),

    // Default grid styles for other variants
    ...(ownerState?.variant &&
      ![
        CollectionVariants.logos,
        CollectionVariants.cta,
        CollectionVariants.testimonial,
        CollectionVariants.splitLayout,
        CollectionVariants.accordionShowcase,
        CollectionVariants.featureShowcase
      ].includes(ownerState.variant) &&
      ownerState?.variant !== CollectionVariants.threePerRow &&
      theme.mixins.generateGridStyles({
        theme,
        layoutConfig,
        variant: ownerState.variant,
        defaultVariant: 'default'
      }))
  }),

  item: ({ theme, ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,

    // Logo items
    ...(ownerState?.variant === CollectionVariants.logos && {
      'flex': '0 0 auto',
      'width': '144px',
      'height': '64px',
      'padding': 'var(--grid-gap)',
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'scrollSnapAlign': 'start',
      'img': {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
      },
      '@container (max-width: 1024px)': {
        width: '120px',
        height: '48px'
      },
      '@container (max-width: 580px)': {
        width: '96px',
        height: '40px'
      }
    }),

    // CTA items (feature blocks)
    ...(ownerState?.variant === CollectionVariants.cta && {
      'backgroundColor': 'var(--mui-palette-grey-900)',
      'padding': 'var(--grid-gap-double)',
      'borderRadius': 'var(--mui-shape-borderRadius)',
      'maxWidth': '600px',
      'display': 'grid',
      'gridTemplateColumns': 'repeat(2, 1fr)',
      'gap': 'var(--grid-gap)',
      '@container (max-width: 580px)': {
        gridTemplateColumns: '1fr',
        padding: 'var(--grid-gap)'
      }
    }),

    // Testimonial items - carousel slides
    ...(ownerState?.variant === CollectionVariants.testimonial && {
      'flex': '0 0 100%', // Full width slides
      'scrollSnapAlign': 'start',
      'position': 'relative',
      'backgroundColor': 'var(--mui-palette-grey-900)',
      'padding': 'var(--grid-gap-double)',
      'borderRadius': 'var(--mui-shape-borderRadius)',
      'minHeight': '400px',
      'display': 'flex',
      'alignItems': 'center',
      'overflow': 'hidden',
      '&::before': {
        content: '"""',
        position: 'absolute',
        top: 'var(--grid-gap)',
        left: 'var(--grid-gap)',
        fontSize: '4rem',
        fontWeight: 700,
        color: 'var(--mui-palette-primary-main)',
        opacity: 0.3
      },
      '@container (max-width: 1024px)': {
        minHeight: '350px'
      },
      '@container (max-width: 580px)': {
        minHeight: '300px',
        padding: 'var(--grid-gap)'
      }
    }),

    // Three per row items - support carousel mode
    ...(ownerState?.variant === CollectionVariants.threePerRow && {
      '[data-carousel="true"] &': {
        'flex': '0 0 calc(33.333% - var(--grid-gap))',
        'scrollSnapAlign': 'start',
        '@container (max-width: 1024px)': {
          flex: '0 0 calc(50% - var(--grid-gap))'
        },
        '@container (max-width: 580px)': {
          flex: '0 0 calc(100% - var(--grid-gap))'
        }
      }
    }),

    // Split Layout items - minimal container styling, let Card handle its own layout
    ...(ownerState?.variant === CollectionVariants.splitLayout && {
      '&:not(:last-child)': {
        marginBottom: 'var(--grid-gap-sm)'
      }
    }),

    // Feature Showcase items - icon cards
    ...(ownerState?.variant === CollectionVariants.featureShowcase && {
      'backgroundColor': 'var(--mui-palette-background-paper)',
      'border': '1px solid var(--mui-palette-divider)',
      'borderRadius': 'var(--mui-shape-borderRadius)',
      'padding': 'var(--grid-gap-lg)',
      'textAlign': 'center',
      'boxShadow': '0 2px 4px rgba(0,0,0,0.05)',
      'transition': 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderColor: 'var(--mui-palette-primary-main)'
      }
    })
  }),

  // Intro text wrapper
  introTextWrap: ({ ownerState }) => ({
    // Split Layout - intro text spans columns 1-6 (left half)
    ...(ownerState?.variant === CollectionVariants.splitLayout && {
      'gridColumn': 'start/six-end',
      // 'paddingRight': 'var(--grid-gap)',
      '@container (max-width: 768px)': {
        // gridColumn: '1 / -1',
        // paddingRight: 0,
        // marginBottom: '72px'
      }
    })
  }),

  // Intro text content
  introText: () => ({}),

  // Pagination dots for carousel variants
  actionsContainer: ({ ownerState }) => ({
    // Testimonial pagination dots
    ...(ownerState?.variant === CollectionVariants.testimonial && {
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--grid-gap-half)',
      padding: 'var(--grid-gap) 0',
      marginTop: 'var(--grid-gap)',

      button: {
        'width': '8px',
        'height': '8px',
        'padding': 0,
        'border': 'none',
        'borderRadius': '50%',
        'backgroundColor': 'var(--mui-palette-grey-400)',
        'cursor': 'pointer',
        'transition': 'all 0.2s ease',
        '&[data-active="true"]': {
          width: '24px',
          borderRadius: '4px',
          backgroundColor: 'var(--mui-palette-primary-main)'
        },
        '&:hover': {
          backgroundColor: 'var(--mui-palette-grey-500)'
        },
        '&[data-active="true"]:hover': {
          backgroundColor: 'var(--mui-palette-primary-dark)'
        }
      }
    })
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Collection'] => [];

const collectionTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Collection: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default collectionTheme;
