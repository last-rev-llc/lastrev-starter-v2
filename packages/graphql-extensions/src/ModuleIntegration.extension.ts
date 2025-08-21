import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers } from '@last-rev/types';

export const typeDefs = gql`
  extend type ModuleIntegration {
    introText: Text
    backgroundImage: Media
    settings: JSON
  }
`;

export const mappers: Mappers = {
  ModuleIntegration: {
    ModuleIntegration: {
      variant: defaultResolver('variant', { camelize: true })
    }
  }
};
