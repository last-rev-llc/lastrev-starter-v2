import {
  type ThemeOptions,
  type ComponentsProps,
  type ComponentsOverrides,
  type ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '../ThemeRegistry/theme.types';

import { CardVariants } from './Card.types';

const defaultProps: ComponentsProps['Card'] = {};

const styleOverrides: ComponentsOverrides<Theme>['Card'] = {
  root: ({ theme, ownerState }) => ({
    'containerType': 'inline-size',
    'width': '100%', // Full width to fill grid cell
    'height': '100%',
    'display': 'flex',
    'flexDirection': 'column',

    ...(ownerState?.link ? { cursor: 'pointer' } : {}),

    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    '& .MuiTypography-root': {
      whiteSpace: 'initial'
    }
  }),

  cardWrap: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    boxShadow: 'initial',
    position: 'relative'
  }),

  media: ({ ownerState, theme }) => ({
    'backgroundColor': 'inherit',

    ':is(picture, svg)': {
      'display': 'flex',
      'height': '100%',
      'width': '100%',

      '&:is(svg)': {
        objectFit: 'fill',
        margin: 'auto'
      }
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 'var(--grid-gap)',
    minHeight: 0
  }),

  bodyWrap: ({ theme }) => ({
    'flex': 1,
    'minHeight': 0,
    '*': {
      ...theme.typography.body1
    }
  }),

  actionsWrap: ({ ownerState, theme }) => ({
    padding: 'var(--grid-gap)',
    marginTop: 'auto',
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
  // Icon Left variant - horizontal layout with icon on left
  {
    props: {
      variant: CardVariants.iconLeft
    },
    style: {
      '[class*=cardWrap]': {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 'var(--grid-gap)',
        backgroundColor: 'transparent',
        boxShadow: 'none'
      },

      '[class*=cardMedia]': {
        flex: '0 0 auto',
        width: '80px',
        height: '80px',
        minWidth: '80px',
        padding: 0,
        backgroundColor: 'transparent'
      },

      '[class*=contentWrap]': {
        flex: 1,
        minWidth: 0,
        padding: 0,
        paddingBottom: 'var(--grid-gap)',
        textAlign: 'left',
        backgroundColor: 'transparent',
        borderBottom: '1px solid var(--mui-palette-divider)'
      },

      '[class*=Card-title]': {
        '&, & *': {
          ...theme.typography.h4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'fontSize': '0.875rem',
          'lineHeight': 1.6,
          'color': 'var(--mui-palette-text-secondary)',
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
      }
    }
  },

  // Icon variant - simple icon without padding/background
  {
    props: {
      variant: CardVariants.icon
    },
    style: {
      '[class*=cardMedia]': {
        maxWidth: '80px',
        padding: 0,
        backgroundColor: 'transparent'
      },

      '[class*=Card-title]': {
        '&, & *': {
          ...theme.typography.h5,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
      },

      '[class*=cardWrap]': {
        // alignItems: 'center',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        gap: theme.spacing(3)
      },
      '[class*=contentWrap]': {
        padding: theme.spacing(0, 0)
        // textAlign: 'center'
      }
    }
  },

  // Icon Center variant
  {
    props: {
      variant: CardVariants.iconCenter
    },
    style: {
      '[class*=cardMedia]': {
        maxWidth: '96px',
        padding: 'var(--grid-gap)'
      },

      '[class*=Card-title]': {
        '&, & *': {
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
      },

      '[class*=cardWrap]': {
        alignItems: 'center'
      },
      '[class*=contentWrap]': {
        textAlign: 'center'
      }
    }
  },

  // Icon Padding variant - icon with padding and background
  {
    props: {
      variant: CardVariants.iconPadding
    },
    style: {
      '[class*=cardWrap]': {
        backgroundColor: 'var(--mui-palette-background-paper)',
        padding: '24px',
        alignItems: 'flex-start'
      },

      '[class*=cardMedia]': {
        'width': '56px',
        'height': '56px',
        'padding': 0,
        'marginBottom': 'var(--grid-gap)',
        ' *': {
          objectFit: 'contain',
          objectPosition: 'center',
          width: '100%',
          height: '100%'
        }
      },

      '[class*=contentWrap]': {
        padding: 0,
        textAlign: 'left',
        paddingBottom: theme.spacing(7)
      },

      '[class*=Card-title]': {
        '&, & *': {
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: 'var(--grid-margin-sm)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          lineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'fontSize': '0.875rem',
          'lineHeight': 1.6,
          'color': 'var(--mui-palette-text-secondary)',
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
      }
    }
  },

  // Logo variant
  {
    props: {
      variant: CardVariants.logo
    },
    style: {
      'backgroundColor': 'var(--mui-palette-background-default)',
      'padding': 0,
      'height': '100px',

      '[class*=cardMedia]': {
        'height': '100%',
        'width': '100%',
        'padding': 0,
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',

        '& :is(img, svg, picture > img)': {
          objectFit: 'contain',
          height: '100%',
          width: '100%',
          margin: 'auto'
        }
      }
    }
  },

  // Media variant
  {
    props: {
      variant: CardVariants.media
    },
    style: {
      '[class*=cardMedia]': {
        'aspectRatio': '16/9',
        'flexShrink': 0,
        '& :is(img, picture)': {
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }
      },

      '[class*=contentWrap]': {
        flex: 1,
        alignItems: 'flex-start',
        textAlign: 'left'
      },

      '[class*=Card-title]': {
        '&, & *': {
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
      }
    }
  },

  // Testimonial variant
  {
    props: {
      variant: CardVariants.testimonial
    },
    style: {
      'overflow': 'hidden',
      'color': 'var(--mui-palette-common-white)',

      '[class*=cardWrap]': {
        'minHeight': '400px',
        'padding': 'var(--grid-gap-double)',

        '@container (max-width: 580px)': {
          minHeight: 'auto',
          padding: 'var(--grid-gap)'
        }
      },

      '[class*=cardMedia]': {
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'zIndex': 0,

        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
          zIndex: 1
        },

        '@container (max-width: 580px)': {
          'position': 'relative',
          'height': '200px',

          '&::after': {
            background: 'rgba(0,0,0,0.6)'
          }
        }
      },

      '[class*=contentWrap]': {
        'position': 'relative',
        'zIndex': 2,
        'padding': 0,
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',

        '@container (min-width: 581px)': {
          maxWidth: '50%'
        }
      },

      '[class*=Card-quote]': {
        'fontSize': 'var(--h3-font-size)',
        'fontWeight': 'var(--body1-font-weight)',
        'marginBottom': 'var(--grid-gap)',

        '&::before': {
          content: '"\\201C"',
          fontSize: '1.5em',
          verticalAlign: 'text-top',
          marginRight: '0.25em'
        },

        '@container (max-width: 580px)': {
          fontSize: 'var(--body1-font-size)'
        }
      },

      '[class*=Card-attribution]': {
        '& [class*=name]': {
          fontSize: 'var(--body2-font-size)',
          fontWeight: 'var(--body2-font-weight)',
          marginBottom: 'var(--grid-gap-quarter)'
        },

        '& [class*=title], & [class*=company]': {
          fontSize: 'var(--bodyXSmall-font-size)',
          opacity: 0.9
        }
      }
    }
  },

  // Icon Stats variant
  {
    props: {
      variant: CardVariants.iconStats
    },
    style: {
      '[class*=cardWrap]': {
        'display': 'grid',
        'gridTemplateColumns': 'auto 1fr',
        'gap': 'var(--grid-gap)',
        'alignItems': 'center',

        '@container (max-width: 580px)': {
          gridTemplateColumns: '1fr',
          alignItems: 'flex-start',
          gap: 'var(--grid-gap-half)'
        }
      },

      '[class*=cardMedia]': {
        'width': '48px',
        'height': '48px',
        'padding': 0,

        '& :is(svg, img)': {
          width: '100%',
          height: '100%',
          color: 'var(--mui-palette-primary-main)'
        }
      },

      '[class*=contentWrap]': {
        padding: 0
      },

      '[class*=Card-statValue]': {
        fontSize: 'var(--h2-font-size)',
        fontWeight: 'var(--h2-font-weight)',
        color: 'var(--mui-palette-primary-main)',
        lineHeight: 1,
        marginBottom: 'var(--grid-gap-quarter)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },

      '[class*=Card-statLabel]': {
        fontSize: 'var(--body2-font-size)',
        fontWeight: 'var(--body2-font-weight)',
        color: 'var(--mui-palette-text-primary)',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        lineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }
    }
  },

  // Icon Listing variant
  {
    props: {
      variant: CardVariants.iconListing
    },
    style: {
      '[class*=cardWrap]': {
        'display': 'grid',
        'gridTemplateColumns': 'auto 1fr',
        'gap': 'var(--grid-gap)',
        'alignItems': 'flex-start',

        '@container (max-width: 580px)': {
          gridTemplateColumns: '1fr',
          gap: 'var(--grid-gap-half)'
        }
      },

      '[class*=cardMedia]': {
        'width': '64px',
        'height': '64px',
        'padding': 0,

        '& :is(svg, img)': {
          width: '100%',
          height: '100%',
          color: 'var(--mui-palette-primary-main)'
        }
      },

      '[class*=contentWrap]': {
        padding: 0,
        textAlign: 'left'
      },

      '[class*=Card-title]': {
        '&, & *': {
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }
      },

      '[class*=bodyWrap]': {
        '& > *': {
          'overflow': 'hidden',
          'display': '-webkit-box',
          'WebkitLineClamp': 10,
          'lineClamp': 10,
          'WebkitBoxOrient': 'vertical',

          '@container (max-width: 580px)': {
            WebkitLineClamp: 4,
            lineClamp: 4
          }
        }
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
