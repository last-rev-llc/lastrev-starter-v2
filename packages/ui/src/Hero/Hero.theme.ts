import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { HeroVariants } from './Hero.types';

// Layout configuration for media columns per variant
export const layoutConfig = {
  [HeroVariants.default]: { xs: 12, md: 6 },
  [HeroVariants.mediaOnRight]: { xs: 12, md: 6 },
  [HeroVariants.mediaOnRightFullBleed]: { xs: 12, md: 6 },
  [HeroVariants.mediaOnLeft]: { xs: 12, md: 6 },
  [HeroVariants.mediaOnLeftFullBleed]: { xs: 12, md: 6 },
  [HeroVariants.mediaAbove]: { xs: 12 },
  [HeroVariants.mediaBelow]: { xs: 12 },
  [HeroVariants.imageOnly]: { xs: 12 },
  [HeroVariants.simple]: { xs: 12, md: 8 },
  [HeroVariants.mediaSmall]: { xs: 12, md: 4 },
  [HeroVariants.news]: { xs: 12, md: 6 }
};

const defaultProps: ComponentsProps['Hero'] = {
  variant: HeroVariants.default
};

const styleOverrides: ComponentsOverrides<Theme>['Hero'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    containerType: 'inline-size',
    position: 'relative',
    minHeight: '60vh',
    display: 'flex',
    overflow: 'hidden'
  }),

  contentOuterGrid: ({ theme }) => ({
    width: '100%',
    [theme.containerBreakpoints.up('md')]: {
      minHeight: '50vh'
    }
  }),

  mainContentWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    zIndex: 2
  },

  content: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(4, 0)
  }),
  contentInnerWrap: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    gap: theme.spacing()
  }),
  title: ({ theme, ownerState }) => ({
    ...theme.typography.h1,
    margin: 0,
    whiteSpace: 'pre-line'
  }),

  subtitle: ({ theme }) => ({
    ...theme.typography.h4,
    margin: 0,
    whiteSpace: 'pre-line'
  }),

  overline: ({ theme }) => ({
    ...theme.typography.overline,
    margin: 0
  }),

  body: ({ theme }) => ({
    ...theme.typography.body1,
    margin: 0
  }),

  actionsWrap: ({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    flexWrap: 'wrap',
    [theme.containerBreakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  }),

  mediaWrap: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    minHeight: '40vh',
    overflow: 'hidden',

    [theme.containerBreakpoints.up('md')]: {
      minHeight: '50vh'
    }
  }),

  media: ({ ownerState }) => ({
    width: '100%',
    height: '100%',
    objectFit: ownerState?.showFullImage ? 'contain' : 'cover',
    objectPosition: 'center',
    display: 'block'
  }),

  breadcrumbsWrap: ({ theme }) => ({
    gridColumnStart: 'start',
    gridColumnEnd: 'end',
    zIndex: 10,
    [theme.containerBreakpoints.up('md')]: {
      position: 'absolute',
      bottom: theme.spacing(3)
    }
  }),

  background: {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'zIndex': 1,

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  }
};

const createVariants = (theme: Theme): ComponentsVariants['Hero'] => [
  // Media on Right variants
  {
    props: { variant: HeroVariants.mediaOnRight },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },
      '[class*=mediaWrap]': {
        gridRow: 1,
        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half'
        }
      }
    }
  },

  {
    props: { variant: HeroVariants.mediaOnRightFullBleed },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'half'
        }
      },
      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',
        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'half'
        }
      }
    }
  },

  // Media on Left variants
  {
    props: { variant: HeroVariants.mediaOnLeft },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },
      '[class*=mediaWrap]': {
        gridRow: 1,
        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half'
        }
      }
    }
  },

  {
    props: { variant: HeroVariants.mediaOnLeftFullBleed },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnStart: 'half'
        }
      },
      '[class*=mediaWrap]': {
        gridRow: 1,
        gridColumnStart: 'full-start',
        gridColumnEnd: 'full-end',
        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'half'
        }
      }
    }
  },

  // Stacked variants
  {
    props: { variant: HeroVariants.mediaAbove },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2
      },
      '[class*=mediaWrap]': {
        gridRow: 1
      }
    }
  },

  {
    props: { variant: HeroVariants.mediaBelow },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 1
      },
      '[class*=mediaWrap]': {
        gridRow: 2
      }
    }
  },

  // Special variants
  {
    props: { variant: HeroVariants.imageOnly },
    style: {
      'minHeight': 'auto',
      'textAlign': 'center',

      '[class*=contentOuterGrid]': {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(6)
      },

      '[class*=title]': {
        ...theme.typography.h1
      },

      '[class*=subtitle]': {
        ...theme.typography.h2,
        color: theme.vars.palette.primary.main
      }
    }
  },

  {
    props: { variant: HeroVariants.simple },
    style: {
      '[class*=mainContentWrap]': {
        [theme.containerBreakpoints.up('md')]: {
          gridColumnEnd: 'three-quarter'
        }
      }
    }
  },

  {
    props: { variant: HeroVariants.mediaSmall },
    style: {
      '[class*=mainContentWrap]': {
        gridRow: 2,
        [theme.containerBreakpoints.up('md')]: {
          gridRow: 1,
          gridColumnEnd: 'three-quarter'
        }
      },
      '[class*=mediaWrap]': {
        gridRow: 1,
        minHeight: '30vh',
        [theme.containerBreakpoints.up('md')]: {
          gridColumnStart: 'three-quarter',
          alignItems: 'flex-end'
        }
      }
    }
  }
];

export const heroTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Hero: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default heroTheme;
