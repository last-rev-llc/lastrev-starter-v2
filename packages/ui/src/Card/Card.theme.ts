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
    'containerType': 'inline-size',
    'height': '100%',

    ...(ownerState?.link ? { 'cursor': 'pointer', '&:hover': {} } : {}),

    ...(ownerState?.variant === CardVariants.hover
      ? {
          [theme.containerBreakpoints.up('md')]: {
            ...theme.mixins.applyColorSchemeOverlay({ ownerState, theme })
          }
        }
      : {
          ...theme.mixins.applyBackgroundColor({ ownerState, theme })
        }),

    '&  .MuiTypography-root': {
      whiteSpace: 'initial'
    }
  }),

  cardWrap: ({ theme, ownerState }) => ({
    ...(ownerState?.variant === CardVariants.hover
      ? {
          [theme.containerBreakpoints.up('md')]: {
            ...theme.mixins.applyColorSchemeOverlay({ ownerState, theme })
          }
        }
      : {
          ...theme.mixins.applyBackgroundColor({ ownerState, theme })
        }),

    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: 'initial',
    position: 'relative',

    ...(ownerState?.aspectRatio === CardAspectRatios.horizontal && {
      ...(ownerState?.variant === CardVariants.media ||
      ownerState?.variant === CardVariants.mediaOnlyFit ||
      ownerState?.variant === CardVariants.mediaOnlyFull
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
      ...(ownerState?.variant === CardVariants.media ||
      ownerState?.variant === CardVariants.mediaOnlyFit ||
      ownerState?.variant === CardVariants.mediaOnlyFull
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
      ...(ownerState?.variant === CardVariants.media ||
      ownerState?.variant === CardVariants.mediaOnlyFit ||
      ownerState?.variant === CardVariants.mediaOnlyFull
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
    'backgroundColor': 'inherit',
    ...(ownerState?.variant === CardVariants.hover && {
      '&::after': {
        backgroundColor: 'inherit',
        opacity: '.5'
      }
    }),

    ':is(picture, svg)': {
      'display': 'flex',
      'height': '100%',
      'width': '100%',
      'aspectRatio': '16/9',

      '&:is(svg)': {
        objectFit: 'fill',
        margin: 'auto'
      },

      ...(ownerState?.variant === CardVariants.mediaOnlyFull && {
        aspectRatio: 'unset'
      }),

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

    'img': {
      'objectFit': 'cover',

      '&[src$=".svg"]': {
        objectFit: 'fill',
        margin: 'auto'
      },

      [theme.containerBreakpoints.up('md')]: {
        minWidth: '100%'
      }
    }
  }),

  contentWrap: ({ ownerState, theme }) => ({
    flex: 1

    // ...(!!ownerState?.backgroundColor ? { padding: 'var(--grid-gap-half)' } : { padding: 0 })
  }),

  bodyWrap: ({ theme }) => ({
    '*': {
      ...theme.typography.body1
    }
  }),

  actionsWrap: ({ ownerState, theme }) => ({
    // ...(!!ownerState?.backgroundColor ? { padding: 'var(--grid-gap-half)' } : { padding: 0 }),
    padding: 0,
    a: {
      padding: 'var(--grid-gap-half)',
      margin: 0
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
      'willChange': 'transform',
      '[class*=MuiCard-root]': {
        transition: '.2s ease-in-out',
        border: '0.5px solid #eaebec'
      },
      '[class*=actionsWrap]': {
        textAlign: 'right',
        justifyContent: 'flex-end'
      },

      '& [class*=Card-content]': {
        display: 'flex',
        flexDirection: 'column'
      },

      '& [class*=Card-title]': {
        marginTop: 0
      },
      '&:hover': {
        '[class*=MuiCard-root]': {
          'background': 'var(--mui-palette-primary-light)',
          'borderColor': 'var(--mui-palette-primary-light)',
          'transform': 'scale(1.05)',

          '*': {
            'var(--mui-palette-primary-text)': 'white',
            'color': 'white'
          }
        }
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
    style: {}
  },
  {
    props: {
      variant: CardVariants.logo
    },
    style: {
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
      variant: CardVariants.mediaOnlyFit
    },
    style: {
      '[class*=CardContent]': {
        display: 'none'
      },

      '[class*=CardMedia]': {
        'margin': 'auto',

        '& :is(img, svg, picture > img)': {
          objectFit: 'contain'
        }
      }
    }
  },
  {
    props: {
      variant: CardVariants.mediaOnlyFull
    },
    style: {
      '[class*=CardContent]': {
        display: 'none'
      },

      '[class*=CardMedia]': {
        '& :is(img, svg, picture > img)': {
          objectFit: 'cover'
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

      '[class*=Card-title]': {
        ...theme.typography.h2
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
      variant: CardVariants.autocomplete
    },
    style: {
      'alignItems': 'flex-start',

      '& .MuiTypography-root': {
        whiteSpace: 'initial'
      },

      '[class*=cardWrap]': {
        display: 'grid',
        gridTemplateColumns: '15cqi auto',
        gridTemplateRows: 'auto',
        gridColumnGap: 'var(--grid-gap-half)',
        gridRowGap: 0,
        borderTop: '1px solid var(--variant-highlight-color)',
        padding: 0
      },

      '&:is(:first-of-type) [class*=cardWrap]': {
        borderTopWidth: 0
      },

      '[class*=Card-title]': {
        ...theme.typography.h5
      },

      '[class*=CardContent]': {
        padding: 0
      },

      '[class*=cardMedia]': {
        'gridColumn': 1,
        'gridRow': '1/-1',
        'alignSelf': 'flex-start',
        'justifySelf': 'center',
        'paddingTop': 'var(--grid-gap-quarter)',

        '& > :is(img, svg, picture)': {
          'aspectRatio': '1/1',
          'objectFit': 'cover',

          '&, & > img': {
            objectFit: 'cover',
            aspectRatio: '1/1'
          }
        }
      },

      '[class*=contentWrap]': {
        gridColumn: 2,
        gridRow: 1,
        paddingTop: 0
      },

      '[class*=bodyWrap]': {
        [theme.breakpoints.down('sm')]: {
          'overflow': 'hidden',
          'textOverflow': 'ellipsis',
          'display': '-webkit-box',
          'lineClamp': '4',
          '-webkit-line-clamp': '4',
          '-webkit-box-orient': 'vertical',

          '@media screen and (orientation:landscape)': {
            display: 'none'
          },

          '*': {
            ...theme.typography.bodyXSmall
          }
        },

        [theme.breakpoints.only('sm')]: {
          '@media screen and (orientation:landscape)': {
            'overflow': 'hidden',
            'textOverflow': 'ellipsis',
            'display': '-webkit-box',
            'lineClamp': '1',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical'
          }
        }
      },

      '[class*=actionsWrap]': {
        display: 'none',
        gridColumn: 2,
        gridRow: 1
      }
    }
  },
  {
    props: {
      variant: CardVariants.iconCenter
    },
    style: {
      '& * ': {
        alignItems: 'center'
      },

      '[class*=Card-title]': {
        ...theme.typography.h2
      },

      '[class*=cardMedia]': {
        maxWidth: 96,
        paddingLeft: 'var(--grid-gap)',
        paddingRight: 'var(--grid-gap)',

        [theme.containerBreakpoints.up('lg')]: {
          '& > :is(img, svg, picture > img)': {
            objectFit: 'contain'
          }
        }
      },

      '[class*=contentWrap]': {
        paddingLeft: 'var(--grid-gap)',
        paddingRight: 'var(--grid-gap)'
      }
    }
  },

  {
    props: {
      variant: CardVariants.person
    },
    style: {
      '[class*=Card-cardMedia]': {
        'width': '100%',
        'height': '100%',
        'position': 'relative',

        '& > div': {
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
  },

  {
    props: {
      variant: CardVariants.search
    },
    style: {
      'alignItems': 'flex-start',

      '[class*=cardWrap]': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'var(--grid-gap)',
        minHeight: 'auto'
      },

      '[class*=cardMedia]': {
        display: 'none'
        // Leaving this for now in case we want to show a small icon
        // 'width': 48,
        // 'alignSelf': 'center',

        // '& > :is(img, svg, picture)': {
        //   'aspectRatio': '1/1',
        //   'objectFit': 'contain',

        //   '&, & > img': {
        //     objectFit: 'contain',
        //     aspectRatio: '1/1'
        //   }
        // }
      },

      '[class*=contentWrap]': {
        'paddingTop': 0,
        '& [class*=Card-title]': {
          ...theme.typography.bodySmall,
          fontWeight: 600,
          marginBottom: 0
        },
        '[class*=bodyWrap]': {
          'paddingBottom': 0,
          '*': {
            ...theme.typography.bodyXSmall
          }
        }
      },

      '[class*=actionsWrap]': {
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
