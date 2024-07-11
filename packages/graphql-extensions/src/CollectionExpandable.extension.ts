import gql from 'graphql-tag';
import type { ApolloContext, Mappers } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export const typeDefs = gql`
  extend type CollectionExpandable {
    items: [CollectionExpandableItem]
    introText: Text
    orientation: String
  }
`;

export const mappers: Mappers = {
  CollectionExpandable: {
    CollectionExpandable: {
      orientation: async (item: any, args: any, ctx: ApolloContext) => {
        return getLocalizedField(item.fields, 'orientation', ctx) ?? 'horizontal';
      }
    }
  }
};
