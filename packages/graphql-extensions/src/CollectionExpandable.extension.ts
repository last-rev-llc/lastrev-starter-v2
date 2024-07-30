import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import { defaultResolver } from './utils/defaultResolver';

export const typeDefs = gql`
  extend type CollectionExpandable {
    items: [CollectionExpandableItem]
    introText: Text
  }
`;

export const mappers: Mappers = {
  CollectionExpandable: {
    CollectionExpandable: {
      backgroundColor: defaultResolver('backgroundColor')
    }
  }
};
