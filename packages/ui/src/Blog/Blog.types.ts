import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import type { Blog_BaseFragmentFragment } from '@graphql-sdk/types';
import { type LinkProps } from '../Link';
import { type HeroProps } from '../Hero';

export enum BlogVariants {
  default = 'default'
}

export interface BlogProps extends Omit<Blog_BaseFragmentFragment, 'variant'> {
  variant: BlogVariants;
  breadcrumbs?: LinkProps[];
  jsonLd: any;
  hero?: HeroProps;
  algoliaSearchKey?: string;
}

export interface BlogOwnerState extends BlogProps {}

interface BlogClasses {
  root: string;
  contentOuterGrid: string;
  headerWrap: string;
  contentWrap: string;
  title: string;
  pubDate: string;
  body: string;
  breadcrumbsWrap: string;
  blogCategories: string;
  blogCategory: string;
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

export declare type BlogClassKey = keyof BlogClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    Blog: BlogClassKey;
  }

  export interface ComponentsPropsList {
    Blog: BlogProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    Blog?: {
      defaultProps?: ComponentsProps['Blog'];
      styleOverrides?: ComponentsOverrides<Theme>['Blog'];
      variants?: ComponentsVariants['Blog'];
    };
  }
}
