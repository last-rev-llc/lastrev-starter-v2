// import type { Mappers } from '@last-rev/types';
import gql from 'graphql-tag';
import { defaultResolver } from './utils/defaultResolver';
import { TypeMappings, type Mappers } from '@last-rev/types';

export const typeMappings: TypeMappings = {
  contentful_text: 'Text'
};

export const typeDefs = gql`
  type Text {
    body: RichText
  }
`;

export const mappers: Mappers = {
  Text: {
    Text: {
      variant: defaultResolver('variant', { camelize: true }),
      backgroundColor: defaultResolver('backgroundColor', { camelize: true })
    }
  }
};
