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
      id: defaultResolver('id'),
      // title: defaultResolver('title'),
      title: (content: any) => {
        console.log('[Card] title', content);
        return content.title;
      },
      subtitle: defaultResolver('subtitle'),
      overline: defaultResolver('overline'),
      body: defaultResolver('body'),
      variant: defaultResolver('variant'),
      backgroundColor: defaultResolver('backgroundColor'),
      media: defaultResolver('media'),
      // link: defaultResolver('link'),
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
