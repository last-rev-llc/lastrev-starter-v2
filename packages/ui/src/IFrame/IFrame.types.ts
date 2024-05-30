import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

export enum IFrameVariants {
  default = 'default'
}

export interface IFrameProps {
  src: string;
  height?: string;
  width?: string;
}

export interface IFrameOwnerState extends IFrameProps {}

interface IFrameClasses {
  root: string;
  contentOuterGrid: string;
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
