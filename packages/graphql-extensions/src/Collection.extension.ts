import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';

import { pascalCase } from './utils/pascalCase';
import { collectOptions } from './utils/collectOptions';
import { queryContentful } from './utils/queryContentful';
import { getWinstonLogger } from '@last-rev/logging';
import { defaultResolver } from './utils/defaultResolver';
import { createType } from './utils/createType';
import { mapCardVariant } from './utils/cardVariantMapping';

const logger = getWinstonLogger({
  package: 'graphql-cms-extensions',
  module: 'Collection'
});

// Note: If you want anything other than the below, this is where you will add it
const COLLECTION_ITEM_TYPES = ['Card', 'Link'];

export const typeDefs = gql`
  extend type Collection {
    items: [CollectionItem]
    introText: Text
    itemsConnection(limit: Int, offset: Int, filter: CollectionFilterInput): CollectionItemConnection
    backgroundImage: Media
    isCarouselDesktop: Boolean
    isCarouselTablet: Boolean
    isCarouselMobile: Boolean
    itemsPerRow: Int
    numItems: Int,
    showFullItemsInCarousel: Boolean
    itemsAspectRatio: String
  }


  type CollectionOptions {
    tags: [Option]
    topics: [Option]
  }

  type Option {
    label: String
    value: String
  }
  
  type ConnectionPageInfo {
    options: CollectionOptions
    allOptions: CollectionOptions
    total: Int
  }

  type CollectionItemConnection {
    pageInfo: ConnectionPageInfo
    items: [CollectionItem]
  }

  input CollectionFilterInput {
    topics: [String]
    tags: [String]
    body: String
  }

  union CollectionItem = ${COLLECTION_ITEM_TYPES.join('| ')}
`;

interface ItemsConnectionArgs {
  limit?: number;
  offset?: number;
  filter?: any;
}

interface CollectionSettings {
  contentType: string;
  limit?: number;
  offset?: number;
  filter?: any;
  order?: string;
  filters: Array<{
    id: string;
    key: string;
  }>;
}

export const mappers: Mappers = {
  Collection: {
    Collection: {
      backgroundColor: defaultResolver('backgroundColor'),
      introText: 'introText_raw',
      items: async (collection: any, _args: any, ctx: ApolloContext) => {
        let items =
          getLocalizedField(collection.fields, 'items', ctx) ??
          getLocalizedField(collection.fields, 'items_raw', ctx) ??
          [];

        // Get the itemsVariant from the collection
        const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx);

        try {
          const { contentType, limit, offset, order, filter } =
            (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
          if (contentType) {
            items = await queryContentful({ contentType, ctx, order, filter, limit, skip: offset });

            // return ctx.loaders.entryLoader.loadMany(
            //   items?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
            // );
          }
        } catch (error: any) {
          logger.error(error.message, {
            caller: 'Collection.items',
            stack: error.stack
          });
        }

        const returnItemsRef = await ctx.loaders.entryLoader.loadMany(
          items?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        );

        let imageItemsRef = getLocalizedField(collection.fields, 'images', ctx) ?? [];
        const imageItems =
          imageItemsRef?.length &&
          (
            await ctx.loaders.assetLoader.loadMany(
              imageItemsRef.map((x: any) => ({ id: x.sys.id, preview: !!ctx.preview }))
            )
          )
            .filter((r) => r !== null)
            .map((asset: any) => createType('Media', { asset }));

        // Map the itemsVariant value
        const mappedItemsVariant = mapCardVariant(itemsVariant);

        const finalItems = (returnItemsRef || []).concat(imageItems || [])?.map((x: any) => ({
          ...x,
          variant: mappedItemsVariant
        }));

        return finalItems;
      },

      isCarouselDesktop: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints =
          getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Desktop');
      },

      isCarouselTablet: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints =
          getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Tablet');
      },

      isCarouselMobile: async (collection: any, _args: any, ctx: ApolloContext) => {
        let carouselBreakpoints =
          getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];
        return carouselBreakpoints.includes('Mobile');
      },

      numItems: async (collection: any, _args: any, ctx: ApolloContext) => {
        let items =
          getLocalizedField(collection.fields, 'items', ctx) ??
          getLocalizedField(collection.fields, 'images', ctx) ??
          [];

        return items.length;
      },

      itemsPerRow: async (collection: any, args: any, ctx: ApolloContext) => {
        const variantFn = defaultResolver('variant');
        const variant = variantFn(collection, args, ctx);
        let items =
          getLocalizedField(collection.fields, 'items', ctx) ??
          getLocalizedField(collection.fields, 'images', ctx) ??
          [];

        let itemsPerRow = 3;
        const numItems = items?.length ?? 3;

        switch (variant) {
          case 'onePerRow':
            itemsPerRow = 1;
            break;

          case 'twoPerRow':
            itemsPerRow = numItems >= 2 ? 2 : numItems;
            break;

          case 'threePerRow':
            itemsPerRow = numItems >= 3 ? 3 : numItems;
            break;

          case 'fourPerRow':
            itemsPerRow = numItems >= 4 ? 4 : numItems;
            break;

          case 'fivePerRow':
            itemsPerRow = numItems >= 5 ? 5 : numItems;
            break;

          default:
            itemsPerRow = 3;
        }

        return itemsPerRow;
      },

      itemsVariant: async (collection: any, _args: any, ctx: ApolloContext) => {
        const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx);
        return mapCardVariant(itemsVariant);
      },

      itemsAspectRatio: defaultResolver('itemsAspectRatio'),

      variant: async (collection: any, args: any, ctx: ApolloContext) => {
        let carouselBreakpoints =
          getLocalizedField(collection.fields, 'carouselBreakpoints', ctx) ?? [];

        const variantFn = defaultResolver('variant');
        const variant = variantFn(collection, args, ctx);

        if (!!carouselBreakpoints.length) return `${variant}Carousel`;

        return variant;
      },

      itemsConnection: async (
        collection: any,
        { limit, offset, filter }: ItemsConnectionArgs,
        ctx: ApolloContext
      ) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        try {
          const { contentType, filters } =
            (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
          // Get all possible items from Contentful
          // Need all to generate the possible options for all items. Not just the current page.
          if (contentType) {
            items = await queryContentful({ contentType, filters, filter, ctx });
            const allItems = await ctx.loaders.entriesByContentTypeLoader.load({
              id: contentType,
              preview: !!ctx.preview
            });
            // const options = await collectOptions({ filters, items, ctx });
            const options = {};
            const allOptions = await collectOptions({ filters, items: allItems, ctx });

            // Paginate results
            if (offset || limit) {
              items = items?.slice(offset ?? 0, (offset ?? 0) + (limit ?? items?.length));
            }

            let fullItemsWithVariant = [];

            if (!!items?.length) {
              // Get and map the itemsVariant value
              const itemsVariant = getLocalizedField(collection.fields, 'itemsVariant', ctx);
              const mappedItemsVariant = mapCardVariant(itemsVariant);

              const fullItems = await ctx.loaders.entryLoader.loadMany(
                items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
              );

              fullItemsWithVariant = fullItems?.map((x: any) => ({
                ...x,
                variant: mappedItemsVariant
              }));
            }

            return {
              pageInfo: {
                options,
                allOptions
              },
              items: fullItemsWithVariant
            };
          }
        } catch (error: any) {
          logger.error(error.message, {
            caller: 'Collection.itemsConnection',
            stack: error.stack
          });
        }

        return items;
      }
    }
  }
};

// TODO: support variant for resolving the CollectionItem type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Card',
  Blog: 'Card',
  Media: 'Card',
  Person: 'Card',
  ElementVideo: 'Card',
  Link: 'Card'
};

export const resolvers = {
  CollectionItem: {
    __resolveType: (item: any) => {
      if (item?.itemsVariant === 'linkList') return 'Link';

      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ??
        pascalCase(item?.sys?.contentType?.sys?.id);

      if (COLLECTION_ITEM_TYPES.includes(type)) return type;

      return 'Card';
    }
  }
};
