import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { PageDocument_PageFragmentFragment } from '@graphql-sdk/types';
import { type LinkProps } from '../Link';
import { type HeroProps } from '../Hero';

export enum PageDocumentVariants {
  default = 'default'
}

export interface PageDocumentProps extends Omit<PageDocument_PageFragmentFragment, 'variant'> {
  variant: PageDocumentVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
}

export interface PageDocumentOwnerState extends PageDocumentProps {}

interface PageDocumentClasses {
  root: string;
  contentOuterGrid: string;
  headerWrap: string;
  contentWrap: string;
  title: string;
  pubDate: string;
  body: string;
  breadcrumbsWrap: string;
  pageDocumentCategories: string;
  pageDocumentCategory: string;
  tags: string;
  tag: string;
  relatedItemsWrap: string;
  relatedItems: string;
  shareLinks: string;
  authorImageWrap: string;
  shareLink: string;
  authorName: string;
  authorSummaryWrap: string;
  authorSocialLinks: string;
  sideContentWrap: string;
  sideContentInnerWrap: string;
  detailsLabel: string;
  bodyHeader: string;
  featuredMediaWrap: string;
}

export declare type PageDocumentClassKey = keyof PageDocumentClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    PageDocument: PageDocumentClassKey;
  }

  export interface ComponentsPropsList {
    PageDocument: PageDocumentProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    PageDocument?: {
      defaultProps?: ComponentsProps['PageDocument'];
      styleOverrides?: ComponentsOverrides<Theme>['PageDocument'];
      variants?: ComponentsVariants['PageDocument'];
    };
  }
}
