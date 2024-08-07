import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import type { Theme } from '@ui/ThemeRegistry/theme.types';

import { RichTextVariants } from './RichText.types';

const defaultProps: ComponentsProps['RichText'] = {};

const styleOverrides: ComponentsOverrides<Theme>['RichText'] = {
  // Set some static styles
  root: {
    'width': '100%',
    ':is(ol, ul)': {
      'padding': 0,
      'marginInlineStart': 'var(--grid-gap-double)',
      'marginBlockStart': 'var(--grid-gap-half)',
      'marginBlockEnd': '0',

      '& > li': {
        marginBottom: '1em',
        padding: 'revert'
      }
    },

    '[class*="MuiTypography-h"]': {
      marginTop: '.5em'
    }
  }
};

const createVariants = (theme: Theme): ComponentsVariants['RichText'] => [
  // Use prop matching to set variant styles
  {
    props: {
      variant: RichTextVariants.inline
    },
    style: {
      '& > *:not(:first-child)': {
        'minHeight': '1em',
        '&:not(:is(ul, ol, li))': {
          marginTop: '1em',
          marginBottom: '1em'
        },

        '&:is(ul, ol)': {
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
        },

        '&[class*=-h1]': {
          ...theme.typography.display3
        },

        '&[class*=-h2]': {
          ...theme.typography.h4
        },

        '&[class*=-h3]': {
          ...theme.typography.h5
        },

        '&[class*=-h4]': {
          ...theme.typography.h5
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
      variant: RichTextVariants.introText
    },
    style: ({ theme }: { theme: Theme }) => ({
      marginBottom: theme.spacing(4)
    })
  },

  {
    props: {
      variant: RichTextVariants.smallText
    },
    style: ({ theme }: { theme: Theme }) => ({
      '& *': {
        ...theme.typography.bodySmall
      }
    })
  }
];

export const richTextTheme = (theme: Theme): ThemeOptions => ({
  components: {
    RichText: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default richTextTheme;
