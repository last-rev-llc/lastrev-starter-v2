import gql from 'graphql-tag';

import { getLocalizedField } from '@last-rev/graphql-cms-core';

import type { ApolloContext } from './types';
import { defaultResolver } from './utils/defaultResolver';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type Header {
    logo: Media
    logoUrl: Link
    navigationItems: [NavigationItem]
    ctaItems: [Link]
    supernavLink: Link
    supernavIcon: Media
    hasCtaItems: Boolean
    searchLandingPage: Link
    autoComplete: Content
  }
`;

export const mappers = {
  Header: {
    Header: {
      hasCtaItems: async (header: any, _args: any, ctx: ApolloContext) => {
        const ctaItems: any = getLocalizedField(header.fields, 'ctaItems', ctx);
        return !!ctaItems.length;
      },
      backgroundColor: defaultResolver('backgroundColor', { camelize: true }),
      autoComplete: async (header: any, _args: any, ctx: ApolloContext) => {
        const settings = {
          configure: {
            hitsPerPage: 5
          },
          indexName: 'cms',
          showFilters: true,
          showSearchBox: true,
          showPagination: false,
          searchAsYouType: true,
          useInfiniteHits: false,
          filtersPlacement: 'left',
          showCurrentRefinements: false,
          minCharacters: 3,
          forceMinCharacters: true,
          showViewAll: true
        };

        return createType('CollectionDynamic', {
          introText: createType('Text', { title: 'Search' }),
          variant: 'onePerRow',
          itemsVariant: 'autocomplete',
          backgroundColor: 'transparentLight',
          settings
        });
      }
    }
  }
};
