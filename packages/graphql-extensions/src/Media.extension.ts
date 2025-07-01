import gql from 'graphql-tag';
import { createRichText, getLocalizedField } from '@last-rev/graphql-cms-core';
import type { ApolloContext } from './types';
import { getVideoEmbedUrl } from './utils/getVideoEmbedUrl';
import { cleanSVG } from './utils/cleanSVG';
import { createType } from './utils/createType';
import { defaultResolver } from './utils/defaultResolver';

export const typeMappings = {};

const mediaFieldResolver = async ({ fields, field, assetField, ctx }: any) => {
  // TODO: Make getting a localized resolved link a single function
  const value: any = getLocalizedField(fields, assetField, ctx);
  if (value) return value;

  const assetRef: any = getLocalizedField(fields, field, ctx);
  if (!assetRef) return null;

  const asset = await ctx.loaders.assetLoader.load({
    id: assetRef?.sys?.id,
    preview: !!ctx.preview
  });
  const fieldValue: any = getLocalizedField(asset?.fields, assetField, ctx);

  return fieldValue;
};

const resolveFile = async (media: any, _args: any, ctx: ApolloContext) => {
  let file: any = media?.file;
  const assetFile = await mediaFieldResolver({
    fields: media?.fields,
    field: 'asset',
    assetField: 'file',
    ctx
  });
  if (assetFile) {
    file = assetFile;
  }
  const assetUrl: any = getLocalizedField(media?.fields, 'assetUrl', ctx);
  if (assetUrl) {
    file = { url: getVideoEmbedUrl(assetUrl) ?? assetUrl };
  }
  return file;
};

export const resolvers = {
  Asset: {
    url: (asset: any) => (asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url)
  }
};

export const mappers = {
  Asset: {
    Asset: {
      url: (asset: any) => (asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url),
      width: (asset: any) => asset?.details?.image?.width,
      height: (asset: any) => asset?.details?.image?.height,

      svgContent: async (asset: any, _args: any, _ctx: ApolloContext) => {
        // We load the SVG content and clean it up for use as inline element
        // We remove the SVG width and height and instead use the one from the content
        const url: string = asset?.url?.startsWith('//') ? `https:${asset?.url}` : asset?.url;
        if (url?.endsWith('.svg')) {
          try {
            const svgContent = await fetch(url).then((res) => res.text());
            let cleaned = cleanSVG(svgContent);

            return cleaned;
          } catch (err) {
            return null;
          }
        }
        return null;
      }
    },
    Card: {
      id: async (asset: any, _args: any, ctx: ApolloContext) => {
        // For Sanity image types with asset reference
        if (asset?.asset?._ref) {
          return asset.asset._ref;
        }
        // For direct asset references
        return asset?.sys?.id || asset?._id || asset?.id;
      },
      title: async (asset: any, _args: any, ctx: ApolloContext) => {
        // Use altText from Sanity image type if available
        if (asset?.altText) {
          return asset.altText;
        }
        // Fallback to asset title
        return asset?.title || null;
      },
      media: async (asset: any, _args: any, ctx: ApolloContext) => {
        // Handle Sanity image type structure
        if (asset?.asset?._ref) {
          // This is a Sanity image type with asset reference
          const resolvedAsset = await ctx.loaders.assetLoader.load({
            id: asset.asset._ref,
            preview: !!ctx.preview
          });

          if (resolvedAsset) {
            return [
              createType('Media', {
                asset: resolvedAsset,
                alt: asset.altText
              })
            ];
          }
        }

        // Handle direct asset reference
        return [createType('Media', { asset })];
      },
      variant: defaultResolver('variant')
    }
  },
  File: {
    Card: {
      title: async (media: any, _args: any, ctx: ApolloContext) => {
        console.log('[Asset->Media] Title', media);
        return media.title;
      }
    }
  },
  Media: {
    Media: {
      // TODO: enable this in fieldResolver
      // title: 'media.title',
      // asset: 'media.asset'
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        let assetUrl: any = getLocalizedField(media?.fields, 'assetUrl', ctx);
        const file = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'file',
          ctx
        });

        // Asset reference will be used if set
        //TODO: Support other ways to control priority
        if (file?.url) assetUrl = file?.url;

        if (assetUrl) {
          if (assetUrl.split('.')[assetUrl.split('.').length - 1] === 'pdf') {
            return 'embed';
          }
          if (getVideoEmbedUrl(assetUrl)) {
            return 'embed';
          }
          if (assetUrl?.split('.')[assetUrl?.split('.').length - 1] === 'mp4') {
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
      variant: async (media: any, _args: any, ctx: ApolloContext) => {
        let assetUrl: any = getLocalizedField(media?.fields, 'assetUrl', ctx);

        const file = await mediaFieldResolver({
          fields: media?.fields,
          field: 'asset',
          assetField: 'file',
          ctx
        });

        // Asset reference will be used if set
        //TODO: Support other ways to control priority
        if (file?.url) assetUrl = file?.url;

        if (assetUrl) {
          if (assetUrl.split('.')[assetUrl.split('.').length - 1] === 'pdf') {
            return 'embed';
          }
          if (getVideoEmbedUrl(assetUrl)) {
            return 'embed';
          }
          if (assetUrl?.split('.')[assetUrl?.split('.').length - 1] === 'mp4') {
            return 'video';
          }
        }
        return 'image';
      },
      id: async (media: any, _args: any, ctx: ApolloContext) => {
        const asset = getLocalizedField(media.fields, 'asset', ctx) ?? [];
        return asset?.sys?.id;
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
      link: async (media: any, _args: any, ctx: ApolloContext) => {
        const link: any = getLocalizedField(media?.fields, 'link', ctx);

        if (!!link?.length) {
          return link[0];
        }
        return null;
      },

      // No actions on media for launch, but needs to be revisited to check media type
      // actions: async (media: any, args: any, ctx: ApolloContext) => {
      //   const text = 'Read Document';
      //   const file = await mediaFieldResolver({
      //     fields: media?.fields,
      //     field: 'asset',
      //     assetField: 'file',
      //     ctx
      //   });

      //   // Asset reference will be used if set
      //   //TODO: Support other ways to control priority
      //   if (!file?.url || isImageUrl(file?.url)) return null;

      //   return [
      //     createType('Link', {
      //       id: media.id,
      //       text,
      //       href: file?.url?.startsWith('//') ? `https:${file?.url}` : file?.url,
      //       variant: 'buttonText'
      //     })
      //   ];
      // },
      body: async (media: any, _args: any, ctx: ApolloContext) => {
        const description: any = getLocalizedField(media?.fields, 'description', ctx);

        if (description) {
          return await createRichText(description);
        }
        return null;
      },
      media: async (media: any, _args: any, ctx: ApolloContext) => {
        return [media];
      }
    }
  }
};

export const typeDefs = gql`
  extend type Media {
    alt: String
    variant: String
    file: Asset
    fileTablet: Asset
    fileMobile: Asset
    link: Link
  }
  extend type Asset {
    # SVG may access content for inline rendering
    svgContent: String
  }
`;
