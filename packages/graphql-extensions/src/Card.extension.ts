import gql from 'graphql-tag';

import type { ApolloContext } from './types';
import { getLocalizedField } from '@last-rev/graphql-cms-core';

import type { Mappers } from '@last-rev/types';
import { mapCardVariant } from './utils/cardVariantMapping';
import { defaultResolver } from './utils/defaultResolver';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Card {
    # Unccoment if using Media reference
    media: [Media]
    actions: [ActionLink]
    link: Link
    variant: String
    aspectRatio: String
    overline: String
    subtitle: String
    body: RichText
  }
`;

export const mappers: Mappers = {
  Card: {
    Card: {
      title: defaultResolver('title'),
      // media: defaultResolver('media'),
      backgroundColor: defaultResolver('backgroundColor', { camelize: true }),
      link: async (card: any, _args: any, ctx: ApolloContext) => {
        const link = getLocalizedField(card.fields, 'link', ctx);

        if (link) return link;

        const actions = getLocalizedField(card.fields, 'actions', ctx);
        if (!!actions?.length) return actions[0];

        return null;
      },
      variant: async (card: any, _args: any, ctx: ApolloContext) => {
        const variant = getLocalizedField(card.fields, 'variant', ctx);
        return mapCardVariant(variant);
      }
    }
  }
};
