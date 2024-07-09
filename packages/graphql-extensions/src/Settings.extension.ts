import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Settings {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
  }
`;

export const mappers: Mappers = {
  Settings: {
    Settings: {
      path: async (settings: any, _args: any, ctx: ApolloContext) => {
        return '/frd';
      },
      hero: async (person: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaBelow',
          backgroundColor: 'sapphire',
          title: 'Function Requirements Document'
        }),
      contents: 'frdContents',
      header: pageHeaderResolver,
      footer: pageFooterResolver
    }
  }
};
