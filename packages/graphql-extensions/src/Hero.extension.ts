import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import { defaultResolver } from './utils/defaultResolver';
import { resolveField } from './utils/resolveField';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';

export const typeDefs = gql`
  extend type Hero {
    actions: [ActionLink]
    sideImageItems: [Media]
    showFullImage: Boolean
    background: Media
    hideBreadcrumbs: Boolean
    overline: String
    title: String
    subtitle: String
    body: RichText
    backgroundColor: String
  }
`;

export const mappers: Mappers = {
  Hero: {
    Hero: {
      // Note: This extension supports both Contentful and Sanity schema structures
      // - Contentful: Direct references or single references
      // - Sanity: Array-based fields for media (with max validation)
      // Basic fields with default resolvers
      variant: defaultResolver('variant', {
        mappings: {
          // Map Sanity values to component expected values
          'Default': 'mediaOnRight',
          'Media on Left': 'mediaOnLeft',
          'Media on Left Full Bleed': 'mediaOnLeftFullBleed',
          'Media on Right': 'mediaOnRight',
          'Media on Right Full Bleed': 'mediaOnRightFullBleed',
          'Media Above': 'mediaAbove',
          'Media Below': 'mediaBelow',
          'Image Only': 'imageOnly',
          // Keep existing camelCase values from Contentful
          'mediaOnLeft': 'mediaOnLeft',
          'mediaOnLeftFullBleed': 'mediaOnLeftFullBleed',
          'mediaOnRight': 'mediaOnRight',
          'mediaOnRightFullBleed': 'mediaOnRightFullBleed',
          'mediaAbove': 'mediaAbove',
          'mediaBelow': 'mediaBelow',
          'imageOnly': 'imageOnly',
          'simple': 'simple',
          'news': 'news',
          'mediaSmall': 'mediaSmall'
        }
      }),
      overline: defaultResolver('overline'),
      title: defaultResolver('title'),
      subtitle: defaultResolver('subtitle'),
      body: defaultResolver('body'),
      backgroundColor: defaultResolver('backgroundColor', { camelize: true }),

      // Boolean fields
      showFullImage: defaultResolver('showFullImage'),
      hideBreadcrumbs: defaultResolver('hideBreadcrumbs'),

      // Actions - resolving references to Link items
      // Works with both array format (Sanity) and single/array format (Contentful)
      actions: defaultResolver('actions_raw'),

      // Media fields - using resolveField to properly handle references
      sideImageItems: resolveField('sideImageItems'),
      background: resolveField('background')
    }
  }
};
