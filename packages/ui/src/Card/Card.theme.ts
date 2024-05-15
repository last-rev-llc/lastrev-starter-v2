import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

import { CardVariants, CardAspectRatios } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    containerType: 'inline-size',
    height: '100%'

    // ...(ownerState?.variant === CardVariants.hover
    //   ? {
    //       [theme.containerBreakpoints.up('md')]: {
    //         ...theme.mixins.applyColorSchemeOverlay({ ownerState, theme })
    //       }
    //     }
    //   : {
    //       ...theme.mixins.applyBackgroundColor({ ownerState, theme })
    //     })
  }),

  cardWrap: ({ theme, ownerState }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: 'initial',
    position: 'relative',

    ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
      ...(ownerState?.variant === CardVariants.media
        ? {
            [theme.breakpoints.up('md')]: { maxHeight: '56.25cqi' }
          }
        : {
            [theme.breakpoints.up('md')]: {
              maxHeight: 'initial',
              minHeight: '56.25cqi'
            }
          })
    }),

    ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
      ...(ownerState?.variant === CardVariants.media
        ? {
            [theme.breakpoints.up('md')]: { minHeight: '177.78cqi' }
          }
        : {
            [theme.breakpoints.up('md')]: {
              maxHeight: 'initial',
              minHeight: '177.78cqi'
            }
          })
    }),

    ...(ownerState?.aspectRatio === CardAspectRatios.square && {
      ...(ownerState?.variant === CardVariants.media
        ? {
            [theme.breakpoints.up('md')]: { maxHeight: '100cqi' }
          }
        : {
            [theme.breakpoints.up('md')]: {
              maxHeight: 'initial',
              minHeight: '100cqi'
            }
          })
    })
  }),

  media: ({ ownerState, theme }) => ({
    backgroundColor: 'inherit',

    ...(ownerState?.variant === CardVariants.hover && {
      '&::after': {
        backgroundColor: 'inherit',
        opacity: '.5'
      }
    }),
    picture: {
      display: 'flex',
      height: '100%',
      width: '100%',
      aspectRatio: '16/9',

      ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
        aspectRatio: '16/9'
      }),

      ...(ownerState?.aspectRatio === CardAspectRatios.vertical && {
        aspectRatio: '1/1',
        [theme.breakpoints.up('md')]: {
          aspectRatio: '9/16'
        }
      }),

      ...(ownerState?.aspectRatio === CardAspectRatios.square && {
        [theme.breakpoints.up('md')]: { aspectRatio: '1/1' }
      })
    },

    img: {
      objectFit: 'cover',

      [theme.containerBreakpoints.up('md')]: {
        minWidth: '100%'
      }
    }
  }),

  contentWrap: ({ theme }) => ({
    flex: 1,
    padding: 'var(--grid-gap-half) 0 0',

    [theme.containerBreakpoints.up('md')]: {
      padding: 'var(--grid-gap)'
    }
  }),

  bodyWrap: ({ theme }) => ({
    'paddingBottom': 'var(--grid-gap)',
    '*': {
      ...theme.typography.body1
    }
  }),

  actionsWrap: ({ theme }) => ({
    padding: '0 0 var(--grid-gap)',

    [theme.containerBreakpoints.up('md')]: {
      padding: '0 var(--grid-gap) var(--grid-gap)'
    },

    a: {
      padding: 0,
      margin: 0
      // marginLeft: '0 !important'
    }
  }),

  link: {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'zIndex': 100,
    '&:hover': {
      '.MuiCardActionArea-focusHighlight': {
        opacity: 0
      }
    }
  }
};

const createVariants = (theme: Theme): ComponentsVariants['Card'] => [
  {
    props: {
      variant: CardVariants.default
    },
    style: {
      '[class*=actionsWrap]': {
        // borderLeft: 'solid 1px var(--mui-palette-text-primary)',
        // paddingBottom: 0,
        padding: 'var(--grid-gap)'
        // paddingRight: 0
      },

      '& [class*=Card-content]': {
        // 'borderLeft': 'solid 1px var(--mui-palette-text-primary)',
        'minHeight': '33cqi',
        'display': 'flex',
        'flexDirection': 'column',
        'paddingBottom': 0,
        'paddingLeft': 'var(--grid-gap)',
        'paddingRight': 0,

        '& > *': {
          marginTop: 'auto'
        }
      },

      '& [class*=Card-title]': {
        marginTop: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.news
    },
    style: {
      'paddingLeft': 'var(--grid-gap)',

      ':is([class*=Card-cardMedia], [class*=Card-bodyWrap])': {
        display: 'none'
      },

      '[class*=actionsWrap]': {
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      },

      '& [class*=Card-content]': {
        'display': 'flex',
        'flexDirection': 'column',
        'padding': 0,

        '& > *': {
          marginTop: 'auto'
        }
      },

      '& [class*=Card-title]': {
        marginTop: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.hover
    },
    style: {
      '[class*=Card-cardMedia]': {
        '&::after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1,
          top: 0,
          left: 0
        }
      },

      [theme.breakpoints.up('md')]: {
        'overflow': 'hidden',

        '[class*=cardWrap]': {
          justifyContent: 'flex-end',
          height: '100%'
        },

        '[class*=Card-cardMedia]': {
          'width': '100%',
          'position': 'absolute',

          '& > *': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        },

        ':is([class*=contentWrap], [class*=actionsWrap])': {
          'padding': '0 var(--grid-gap)',
          'flex': 0,
          'width': '100%',
          'zIndex': 20,
          'boxSizing': 'border-box',

          '& > *': {
            overflow: 'hidden',
            maxHeight: 0,
            transition: 'transform .25s linear',
            willChange: 'transform, max-height',
            transformOrigin: 'bottom',
            transform: 'scaleY(0)'
          },

          '[class*=Card-title]': {
            maxHeight: 'initial',
            transform: 'scaleY(1)'
          }
        },

        '[class*=bodyWrap]': {
          paddingBottom: 0
        },

        '[class*=actionsWrap]': {
          paddingBottom: 'var(--grid-gap-half)'
        },

        '&:not(:hover)': {
          '[class*=Card-title]': {
            marginBottom: 0
          }
        },

        '&:hover': {
          ':is([class*=contentWrap], [class*=actionsWrap])': {
            '& > *': {
              maxHeight: '100%',
              transform: 'scaleY(1)'
            }
          },

          '[class*=contentWrap]': {
            '& > *:last-child': {
              paddingBottom: 'var(--grid-gap-quarter)'
            }
          }
        }
      }
    }
  },
  {
    props: {
      variant: CardVariants.media
    },
    style: {
      '[class*=cardContent]': {
        display: 'none'
      }
    }
  },
  {
    props: {
      variant: CardVariants.logo
    },
    style: {
      '[class*=cardContent]': {
        display: 'none'
      },

      '[class*=cardMedia]': {
        'margin': 'auto',
        'padding': 'var(--grid-gap-double)',
        '& :is(img, svg, picture > img)': {
          objectFit: 'contain'
        }
      }
    }
  },
  {
    props: {
      variant: CardVariants.icon
    },
    style: {
      'alignItems': 'flex-start',
      'borderLeft': 'solid 1px var(--mui-palette-text-primary)',

      '[class*=Card-title]': {
        ...theme.typography.h1
      },

      '[class*=cardMedia]': {
        maxWidth: 96,
        paddingLeft: 'var(--grid-gap)',

        [theme.containerBreakpoints.up('lg')]: {
          '& > :is(img, svg, picture > img)': {
            objectFit: 'contain'
          }
        }
      },

      '[class*=contentWrap]': {
        paddingLeft: 'var(--grid-gap)'
      }
    }
  },

  {
    props: {
      variant: CardVariants.iconLeft
    },
    style: {
      'alignItems': 'flex-start',
      'borderLeft': 'solid 1px var(--mui-palette-text-primary)',

      '[class*=cardWrap]': {
        display: 'grid',
        gridTemplateColumns: '15cqi auto',
        gridTemplateRows: 'auto auto',
        gridGap: 'var(--grid-gap)'
      },

      '[class*=cardMedia]': {
        'gridColumn': 1,
        'gridRow': '1/-1',
        'alignSelf': 'flex-start',
        'paddingLeft': 'var(--grid-gap-half)',

        '& > :is(img, svg, picture)': {
          'aspectRatio': '1/1',
          'objectFit': 'contain',

          '&, & > img': {
            objectFit: 'contain',
            aspectRatio: '1/1'
          }
        }
      },

      '[class*=contentWrap]': {
        gridColumn: 2,
        gridRow: 1,
        paddingTop: 0
      },

      '[class*=actionsWrap]': {
        gridColumn: 2,
        gridRow: 2,
        paddingBottom: 0
      }
    }
  },

  {
    props: {
      variant: CardVariants.person
    },
    style: {
      //
      '[class*=Card-cardMedia]': {
        'width': '100%',
        'height': '100%',
        'position': 'relative',

        '&>div': {
          // Needed for animations
          width: 'inherit',
          height: 'inherit',
          position: 'inherit'
        },

        '& :is(img, picture)': {
          width: '100%',
          objectFit: 'contain',

          minHeight: 'inherit',
          height: '100%',
          [theme.breakpoints.up('md')]: {
            objectFit: 'cover'
          }
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1,
          top: 0,
          left: 0
        }
      },

      '[class*=Card-subtitle]': {
        marginBottom: 'var(--grid-gap-half)'
      },

      '[class*=Card-overline], [class*=body]': {
        display: 'none'
      }
    }
  }
];

export const cardTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Card: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default cardTheme;
