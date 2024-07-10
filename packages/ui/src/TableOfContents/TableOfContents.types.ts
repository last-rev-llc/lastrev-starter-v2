import type { ComponentsOverrides, ComponentsVariants, ComponentsProps } from '@mui/material';

import { type LinkProps } from '../Link';

export enum TableOfContentsVariants {
  default = 'default'
}

export interface TableOfContentsProps {
  items?: Array<LinkProps>;
}

export interface TableOfContentsOwnerState extends TableOfContentsProps {}

interface TableOfContentsClasses {
  root: string;
  navLinksList: string;
  navLinksListItem: string;
  navLink: string;
}

export declare type TableOfContentsClassKey = keyof TableOfContentsClasses;

declare module '@mui/material/styles' {
  export interface ComponentNameToClassKey {
    TableOfContents: TableOfContentsClassKey;
  }

  export interface ComponentsPropsList {
    TableOfContents: TableOfContentsProps;
  }
}

declare module '@mui/material/styles' {
  interface Components {
    TableOfContents?: {
      defaultProps?: ComponentsProps['TableOfContents'];
      styleOverrides?: ComponentsOverrides<Theme>['TableOfContents'];
      variants?: ComponentsVariants['TableOfContents'];
    };
  }
}
