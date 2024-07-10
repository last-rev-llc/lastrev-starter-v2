import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { ModuleIntegration_BaseFragmentFragment } from '@graphql-sdk/types';

export enum IFrameVariants {
  default = 'default'
}

export interface IFrameProps extends Omit<ModuleIntegration_BaseFragmentFragment, 'variant'> {}

export interface IFrameOwnerState extends IFrameProps {}

interface IFrameClasses {
  contentOuterGrid: string;
  iframeWrap: string;
  introText: string;
  introTextGrid: string;
  mainContentWrap: string;
  root: string;
}

export declare type IFrameClassKey = keyof IFrameClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    IFrame: IFrameClassKey;
  }

  export interface ComponentsPropsList {
    IFrame: IFrameProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    IFrame?: {
      defaultProps?: ComponentsProps['IFrame'];
      styleOverrides?: ComponentsOverrides<Theme>['IFrame'];
      variants?: ComponentsVariants['IFrame'];
    };
  }
}
