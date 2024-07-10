import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { ModuleIntegration_BaseFragmentFragment } from '@graphql-sdk/types';

export enum ChatFullPageVariants {
  default = 'default'
}

export interface ChatFullPageProps
  extends Omit<ModuleIntegration_BaseFragmentFragment, 'variant'> {}

export interface ChatFullPageOwnerState extends ChatFullPageProps {}

interface ChatFullPageClasses {
  contentOuterGrid: string;
  chatFullPageWrap: string;
  introText: string;
  introTextGrid: string;
  mainContentWrap: string;
  root: string;
}

export declare type ChatFullPageClassKey = keyof ChatFullPageClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    ChatFullPage: ChatFullPageClassKey;
  }

  export interface ComponentsPropsList {
    ChatFullPage: ChatFullPageProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    ChatFullPage?: {
      defaultProps?: ComponentsProps['ChatFullPage'];
      styleOverrides?: ComponentsOverrides<Theme>['ChatFullPage'];
      variants?: ComponentsVariants['ChatFullPage'];
    };
  }
}
