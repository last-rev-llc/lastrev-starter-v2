import type {
  ThemeOptions,
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants
} from '@mui/material/styles';
import { Theme } from '@ui/ThemeRegistry/theme.types';

const defaultProps: ComponentsProps['PageHr'] = {};

const styleOverrides: ComponentsOverrides<Theme>['PageHr'] = {
  root: ({ theme }) => ({
    '& > *': {
      paddingTop: 'var(--section-padding)',
      paddingBottom: 'var(--section-padding)'
    }
  })
};

const createVariants = (_theme: Theme): ComponentsVariants['PageHr'] => [];

export const pagehrTheme = (theme: Theme): ThemeOptions => ({
  components: {
    PageHr: {
      defaultProps,
      styleOverrides,
      variants: createVariants(theme)
    }
  }
});

export default pagehrTheme;
