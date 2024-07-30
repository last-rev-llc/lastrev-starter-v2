// import type { Mappers } from '@last-rev/types';
import gql from 'graphql-tag';
import { defaultResolver } from './utils/defaultResolver';
import { type Mappers } from '@last-rev/types';

export const typeDefs = gql`
  type Text {
    body: RichText
  }
`;

export const mappers: Mappers = {
  Text: {
    Text: {
      backgroundColor: defaultResolver('backgroundColor'),
      variant: defaultResolver('variant')
    }
  }
};
