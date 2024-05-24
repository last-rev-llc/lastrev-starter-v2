import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { CollectionProps } from '../Collection/Collection.types';
import { LinkProps } from '../Link/Link.types';

export enum LinkWheelVariants {
  default = 'default',
  onePerRow = 'onePerRow',
  twoPerRow = 'twoPerRow',
  threePerRow = 'threePerRow',
  fourPerRow = 'fourPerRow',
  fivePerRow = 'fivePerRow',
  linkList = 'linkList'
}

export interface LinkWheelProps extends CollectionProps {
  items: [LinkProps];
}

export interface LinkWheelOwnerState extends LinkWheelProps {}

interface LinkWheelClasses {
  root: string;
  contentGrid: string;
  introTextWrap: string;
  introText: string;
  pieChartWrap: string;
  actionsContainer: string;
  action: string;
}

export declare type LinkWheelClassKey = keyof LinkWheelClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    LinkWheel: LinkWheelClassKey;
  }

  export interface ComponentsPropsList {
    LinkWheel: LinkWheelProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    LinkWheel?: {
      defaultProps?: ComponentsProps['LinkWheel'];
      styleOverrides?: ComponentsOverrides<Theme>['LinkWheel'];
      variants?: ComponentsVariants['LinkWheel'];
    };
  }
}
