import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { ModuleIntegration_BaseFragmentFragment } from '@graphql-sdk/types';

export enum ChatVariants {
  default = 'default'
}

export interface ChatProps extends Omit<ModuleIntegration_BaseFragmentFragment, 'variant'> {
  settings?: {
    chatflowid?: string;
    apiHost?: string;
    other?: any;
    theme?: any;
  };
  chatWidth?: 'full' | 'narrow' | string;
  chatHeight?: 'full' | 'narrow' | string;
}

export interface ChatOwnerState extends ChatProps {}

interface ChatClasses {
  contentOuterGrid: string;
  introText: string;
  introTextGrid: string;
  mainContentWrap: string;
  root: string;
}

export declare type ChatClassKey = keyof ChatClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Chat: ChatClassKey;
  }

  export interface ComponentsPropsList {
    Chat: ChatProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Chat?: {
      defaultProps?: ComponentsProps['Chat'];
      styleOverrides?: ComponentsOverrides<Theme>['Chat'];
      variants?: ComponentsVariants['Chat'];
    };
  }
}
