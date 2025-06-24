import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { CollectionExpandable_BaseFragmentFragment } from '@graphql-sdk/types';

export enum CollectionExpandableVariants {
  default = 'default',
  documentManager = 'documentManager',
  timeline = 'timeline',
  faq = 'faq'
}

export interface CollectionExpandableProps
  extends Omit<CollectionExpandable_BaseFragmentFragment, 'variant'> {
  variant?: CollectionExpandableVariants;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showProgressIndicator?: boolean;
  expandMultiple?: boolean;
  defaultExpanded?: number; // Index of initially expanded item
  fadeTransition?: boolean;
}

export interface CollectionExpandableOwnerState extends CollectionExpandableProps {}

interface CollectionExpandableClasses {
  root: string;
  contentGrid: string;
  introTextWrap: string;
  introText: string;
  itemsContainer: string;
  item: string;
  itemHeader: string;
  itemContent: string;
  itemImage: string;
  progressIndicator: string;
  progressBar: string;
  expandIcon: string;
  imageContainer: string;
  sharedImage: string;
}

export declare type CollectionExpandableClassKey = keyof CollectionExpandableClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    CollectionExpandable: CollectionExpandableClassKey;
  }

  export interface ComponentsPropsList {
    CollectionExpandable: CollectionExpandableProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    CollectionExpandable?: {
      defaultProps?: ComponentsProps['CollectionExpandable'];
      styleOverrides?: ComponentsOverrides<Theme>['CollectionExpandable'];
      variants?: ComponentsVariants['CollectionExpandable'];
    };
  }
}