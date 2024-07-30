import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';

import { type Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['TableOfContents'] = {};

const styleOverrides: ComponentsOverrides<Theme>['TableOfContents'] = {
  // root: {},

  navLinksList: {
    padding: 0,
    listStyle: 'none'
  },

  navLinksListItem: {
    marginBottom: 'var(--grid-gap-quarter)',
    paddingLeft: 'var(--grid-gap-quarter)'
  }

  // navLink: {}
};

const createVariants = (theme: Theme): ComponentsVariants['TableOfContents'] => [];

export const TableOfContentsTheme = (theme: Theme): ThemeOptions => ({
  components: {
    TableOfContents: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default TableOfContentsTheme;
