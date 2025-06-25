import gql from 'graphql-tag';

import { defaultResolver } from './utils/defaultResolver';

import type { Mappers, TypeMappings } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createType } from './utils/createType';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import { resolveField } from './utils/resolveField';

export const typeMappings: TypeMappings = {
  contentful_block: 'Block'
};

export const typeDefs = gql`
  extend type Block {
    introText: Text
    mediaItems: [Media]
    actions: [ActionLink]
    link: Link
    supplementalContent: Content
    backgroundImage: Media
    body: RichText
  }
`;

export const mappers: Mappers = {
  Block: {
    Block: {
      variant: defaultResolver('variant', { camelize: true }),
      imageOverlayColor: defaultResolver('imageOverlayColor'),

      backgroundColor: defaultResolver('backgroundColor', { camelize: true }),

      mediaItems: async (block: any, _args: any, ctx: ApolloContext) => {
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        if (mediaItem) return [mediaItem];
        return null;
      },
      body: async (block: any, _args: any, ctx: ApolloContext) => {
        const variant = defaultResolver('variant', { camelize: true })(block, _args, ctx);
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        const supplementalContent = getLocalizedField(block.fields, 'supplementalContent', ctx);
        if (variant !== 'noContent' && !mediaItem && !supplementalContent) return null;

        const body = getLocalizedField(block.fields, 'body', ctx);

        return body;
      },

      supplementalContent: async (block: any, _args: any, ctx: ApolloContext) => {
        const variant = defaultResolver('variant', { camelize: true })(block, _args, ctx);

        if (variant === 'noContent') return null;
        const mediaItem = getLocalizedField(block.fields, 'asset', ctx);
        if (mediaItem) return createType('Media', { file: mediaItem });

        const supplementalContent = await resolveField('supplementalContent')(block, _args, ctx);

        if (supplementalContent?.sys?.contentType?.sys?.id === 'pageDocument') {
          return createType('Collection', {
            items: [supplementalContent],
            variant: 'threePerRow',
            itemsVariant: 'default',
            itemsAspectRatio: 'horizontal'
          });
        }

        if (supplementalContent) return supplementalContent;

        const body = getLocalizedField(block.fields, 'body', ctx);

        if (body) return createType('Text', { body });

        return null;
      }
    }
  }
};
