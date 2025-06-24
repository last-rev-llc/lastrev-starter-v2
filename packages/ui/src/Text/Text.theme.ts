import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import type { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['Text'] = {
  variant: TextVariants.default,
  align: 'center'
};

import { TextVariants } from './Text.types';

const styleOverrides: ComponentsOverrides<Theme>['Text'] = {
  root: ({ theme, ownerState }) => ({
    'position': 'relative',
    'width': '100%',
    'display': 'unset',
    'ol, ul, li': {
      /* Revert padding reset is what gives the indentation to list */

      padding: 'revert'
    },

    '& > *:last-child': {
      paddingBottom: 0,
      marginBottom: 0
    },

    'main > &': {
      'display': 'grid',

      '& > *': {
        display: 'unset',
        gridColumn: 'start/end'
      }
    }
  }),

  bodyWrap: ({ ownerState, theme }) => ({
    '&&': {
      'section > *:not(:first-child)': {
        'minHeight': '1em',
        '&:not(:is(ul, ol, li))': {
          marginTop: '0.7em',
          marginBottom: '0.7em'
        },

        '&:is(ul, ol)': {
          marginTop: '-.5em',
          marginBottom: '2em',
          marginLeft: '2em'
        },

        '&:is(span)': {
          // Image Wraps
          marginTop: '2em !important',
          marginBottom: '2em !important'
        },

        '&[class*=MuiTypography-h]': {
          marginBottom: '.5em',
          marginTop: '1em'
        }

        // '&[class*=-h1]': {
        //   ...theme.typography.h1
        // },

        // '&[class*=-h2]': {
        //   ...theme.typography.h2
        // },

        // '&[class*=-h3]': {
        //   ...theme.typography.h3
        // },

        // '&[class*=-h4]': {
        //   ...theme.typography.h4
        // }
      },

      '& > [class*=Text-root] > *:first-child': {
        marginTop: '0'
      },

      '[class*=MuiTypography-h]': {
        marginBottom: '.5em',
        marginTop: '2em'
      }
    },

    '& > *:last-child': {
      marginBottom: 0
    }
  }),

  titleWrap: {
    display: 'flex'
  },

  title: ({ theme, ownerState }) => ({
    width: '100%'
  }),

  subtitle: ({ theme }) => ({
    ...theme.typography.h3
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['Text'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: TextVariants.inline
    },
    style: {
      // TODO: Pulled from Text, but adds default padding around elements.   Classes may be wrong
      '& > [class*=Text-root] > *:not(:first-child)': {
        '&:not(:is(ul, ol, li))': {
          marginTop: '1em',
          marginBottom: '2em'
        },

        '&:is(ul, ol)': {
          marginTop: '-1em',
          marginBottom: '3em'
        }
      },

      '& > [class*=Text-root] > *:first-child': {
        marginTop: '0'
      },

      '[class*=MuiTypography-h]': {
        marginBottom: '.5em',
        marginTop: '2em'
      }
    }
  },

  {
    props: {
      variant: TextVariants.introText
    },
    style: ({ theme }: { theme: Theme }) => ({
      marginBottom: theme.spacing(9)
    })
  }
];

export const textTheme = (theme: Theme): ThemeOptions => ({
  components: {
    Text: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default textTheme;
