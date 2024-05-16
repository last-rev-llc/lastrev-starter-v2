import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';

import { getVideoEmbedUrl } from './utils/getVideoEmbedUrl';
import { mediaFieldResolver } from './utils/mediaFieldResolver';
import { resolveFile } from './utils/resolveFile';

export const typeDefs = gql`
  extend type ElementVideo {
    alt: String
    variant: String
    file: Asset
    fileTablet: Asset
    fileMobile: Asset
  }
`;

export const typeMappings = {};

export const mappers = {
  ElementVideo: {
    ElementVideo: {
      // TODO: enable this in fieldResolver
      // title: 'media.title',
      // asset: 'media.asset'
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        let assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
        const file = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'file',
          ctx
        });

        // Asset reference will be used if set
        //TODO: Support other ways to control priority
        if (file?.url) assetURL = file?.url;

        if (assetURL) {
          if (assetURL.split('.')[assetURL.split('.').length - 1] === 'pdf') {
            return 'embed';
          }
          if (getVideoEmbedUrl(assetURL)) {
            return 'embed';
          }
          if (assetURL?.split('.')[assetURL?.split('.').length - 1] === 'mp4') {
            return 'video';
          }
        }
        return 'image';
      },

      title: async (media: any, _args: any, ctx: ApolloContext) => {
        const title: any = getLocalizedField(media?.fields, 'title', ctx);
        const assetTitle: any = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'title',
          ctx
        });
        return title ?? assetTitle;
      },

      file: resolveFile,

      fileTablet: async (media: any, _args: any, ctx: ApolloContext) => {
        const defaultFile = await resolveFile(media, _args, ctx);
        let file: any;
        const assetFile = await mediaFieldResolver({
          fields: media?.fields,
          field: 'tablet',
          assetField: 'file',
          ctx
        });
        if (assetFile && assetFile !== defaultFile) {
          file = assetFile;
        }
        return file;
      },

      fileMobile: async (media: any, _args: any, ctx: ApolloContext) => {
        const defaultFile = await resolveFile(media, _args, ctx);

        let file: any;
        const assetFile = await mediaFieldResolver({
          fields: media?.fields,
          field: 'mobile',
          assetField: 'file',
          ctx
        });
        if (assetFile && assetFile !== defaultFile) {
          file = assetFile;
        }
        return file;
      }
    },
    Card: {
      // TODO: enable this in fieldResolver
      // title: 'media.title',
      // asset: 'media.asset'
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        let assetURL: any = getLocalizedField(media?.fields, 'assetURL', ctx);
        const file = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'file',
          ctx
        });

        // Asset reference will be used if set
        //TODO: Support other ways to control priority
        if (file?.url) assetURL = file?.url;

        if (assetURL) {
          if (assetURL.split('.')[assetURL.split('.').length - 1] === 'pdf') {
            return 'embed';
          }
          if (getVideoEmbedUrl(assetURL)) {
            return 'embed';
          }
          if (assetURL?.split('.')[assetURL?.split('.').length - 1] === 'mp4') {
            return 'video';
          }
        }
        return 'image';
      },

      title: async (media: any, _args: any, ctx: ApolloContext) => {
        const title: any = getLocalizedField(media?.fields, 'title', ctx);
        const assetTitle: any = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'title',
          ctx
        });
        return title ?? assetTitle;
      },

      media: async (video: any, args: any, ctx: ApolloContext) => {
        return [video];
      }
    }
  }
};
