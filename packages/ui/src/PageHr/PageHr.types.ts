import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { PageHr_BaseFragmentFragment } from '@graphql-sdk/types';
import { LinkProps } from '../Link/Link.types';

export enum PageHrVariants {
  default = 'default'
}

export interface PageHrProps extends Omit<PageHr_BaseFragmentFragment, 'variant'> {
  disableBackToTop?: boolean;
  variant?: PageHrVariants;
  breadcrumbs?: LinkProps[];
}

interface PageHrClasses {
  root: string;
}

export declare type PageHrClassKey = keyof PageHrClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    PageHr: PageHrClassKey;
  }

  export interface ComponentsPropsList {
    PageHr: PageHrProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    PageHr?: {
      defaultProps?: ComponentsProps['PageHr'];
      styleOverrides?: ComponentsOverrides<Theme>['PageHr'];
      variants?: ComponentsVariants['PageHr'];
    };
  }
}
