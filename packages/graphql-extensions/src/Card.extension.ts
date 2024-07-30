import gql from 'graphql-tag';

import type { ApolloContext } from './types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import type { Mappers } from '@last-rev/types';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    # Unccoment if using Media reference
    #media: [Media]
    actions: [ActionLink]
    link: Link
    variant: String
    aspectRatio: String
  }
`;

export const mappers: Mappers = {
  Card: {
    Card: {
      link: async (card: any, _args: any, ctx: ApolloContext) => {
        const link = getLocalizedField(card.fields, 'link', ctx);

        if (link) return link;

        const actions = getLocalizedField(card.fields, 'actions', ctx);
        if (!!actions?.length) return actions[0];

        return null;
      }
    }
  }
};
