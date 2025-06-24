import gql from 'graphql-tag';

import { getLocalizedField } from '@last-rev/graphql-cms-core';
import type { ApolloContext } from './types';
import { pascalCase } from './utils/pascalCase';
import { defaultResolver } from './utils/defaultResolver';
import { pathResolver } from './utils/pathResolver';
import { createPath } from './utils/createPath';

const SUB_NAVIGATION_ITEM_TYPES = ['Link', 'NavigationItem', 'Page', 'Person', 'Blog'];

const hrefUrlResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const href = getLocalizedField(link.fields, 'href', ctx);
  const manualUrl = getLocalizedField(link.fields, 'manualUrl', ctx);
  if (href || manualUrl) return createPath(href ?? manualUrl);

  const contentRef = getLocalizedField(link.fields, 'linkedContent', ctx);
  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({
      id: contentRef.sys.id,
      preview: !!ctx.preview
    });
    if (content) {
      if (content?.sys?.contentType?.sys?.id === 'media') {
        const assetRef = getLocalizedField(content.fields, 'asset', ctx);
        const asset = await ctx.loaders.assetLoader.load({
          id: assetRef.sys.id,
          preview: !!ctx.preview
        });
        if (asset) {
          return `https:${getLocalizedField(asset.fields, 'file', ctx)?.url}`;
        }
      }
      const slug = getLocalizedField(content?.fields, 'slug', ctx);

      if (slug) return pathResolver(content, _, ctx);
    }
  }
  return '#';
};

export const typeDefs = gql`
  extend type NavigationItem {
    actions: [Link]
    navMedia: Media
    subNavigation: [SubNavigationItem]
    href: String!
    summary: RichText,
    icon: String
    iconPosition: String
  }

  union SubNavigationItem = ${SUB_NAVIGATION_ITEM_TYPES.join('| ')}
`;

export const mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant', { camelize: true }),
      href: hrefUrlResolver
    },
    Link: {
      href: hrefUrlResolver,
      variant: defaultResolver('variant', { camelize: true })
    }
  }
};

const ITEM_MAPPING: { [key: string]: string } = {
  NavigationItem: 'NavigationItem',
  Link: 'Link',
  Page: 'Link',
  Person: 'Link',
  Blog: 'Link'
};

export const resolvers = {
  SubNavigationItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ??
        pascalCase(item?.sys?.contentType?.sys?.id);
      if (SUB_NAVIGATION_ITEM_TYPES.includes(type)) return type;

      return 'Link';
    }
  }
};
