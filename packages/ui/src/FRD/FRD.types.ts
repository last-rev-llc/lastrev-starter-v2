import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { ContentModule_SettingsFragmentFragment } from '@graphql-sdk/types';
import { LinkProps } from '../Link/Link.types';

export enum FRDVariants {
  default = 'default'
}

export interface FRDProps extends Omit<FRD_BaseFragmentFragment, 'variant'> {
  disableBackToTop?: boolean;
  variant?: FRDVariants;
}

interface FRDClasses {
  root: string;
  contentOuterGrid: string;
  sideNavWrap: string;
  contentWrap: string;
}

export declare type FRDClassKey = keyof FRDClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    FRD: FRDClassKey;
  }

  export interface ComponentsPropsList {
    FRD: FRDProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    FRD?: {
      defaultProps?: ComponentsProps['FRD'];
      styleOverrides?: ComponentsOverrides<Theme>['FRD'];
      variants?: ComponentsVariants['FRD'];
    };
  }
}
