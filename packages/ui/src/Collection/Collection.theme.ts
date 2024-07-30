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
  }
};

const styleOverrides: ComponentsOverrides<Theme>['Collection'] = {
  root: ({ theme, ownerState }) => ({
    ...theme.mixins.applyBackgroundColor({ ownerState, theme }),

    containerType: 'inline-size',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative'
  }),

  itemsGrid: ({ theme, ownerState }) => ({
    gridColumn: 'start/end',
    gap: 'inherit',

    ...(ownerState?.variant &&
      theme.mixins.generateGridStyles({
        theme,
        layoutConfig,
        variant: ownerState.variant,
        defaultVariant: 'default'
      }))
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
