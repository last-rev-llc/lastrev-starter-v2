import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { getDefaultCtaText } from './utils/getDefaultCtaText';
import { formatDate } from './utils/formatDate';

export const typeDefs = gql`
  extend type Blog {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    categories: [CategoryBlog]
    breadcrumbs: [Link]
    author: Person
    hero: Content
    aboutText: RichText
  }
`;

export const mappers: Mappers = {
  Blog: {
    Blog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,

      relatedItems: async (blog: any, _args: any, ctx: ApolloContext) => {
        const relatedItems = getLocalizedField(blog.fields, 'relatedItems', ctx);
        if (!relatedItems?.length) return null;

        return createType('Collection', {
          introText: createType('Text', { title: 'Related Documents' }),
          items: relatedItems,
          variant: 'fourPerRow',
          itemsVariant: 'default',
          itemsAspectRatio: 'horizontal',
          backgroundColor: 'coolGrey'
        });

        // return createType('CollectionDynamic', {
        //   introText: createType('Text', { title: 'Related News' }),
        //   // items: relatedItems,
        //   variant: 'threePerRow',
        //   itemsVariant: 'default',
        //   itemsAspectRatio: 'horizontal',
        //   backgroundColor: 'coolGrey',
        //   settings: {
        //     configure: {
        //       facetFilters: ['locale:en-US', 'contentType:Blog'],
        //       hitsPerPage: 3
        //     },
        //     indexName: 'contentful',
        //     showFilters: false,
        //     showSearchBox: false,
        //     showPagination: false,
        //     searchAsYouType: false,
        //     useInfiniteHits: false,
        //     showCurrentRefinements: false
        //   }
        // });
      },
      hero: async (blog: any, _args: any, ctx: ApolloContext) => {
        const textArray = [];

        const categoriesRef = getLocalizedField(blog?.fields, 'categories', ctx);
        const categoriesIds =
          categoriesRef?.map((content: any) => {
            return { id: content?.sys.id, preview: !!ctx.preview };
          }) ?? [];

        const categories: any[] = (await ctx.loaders.entryLoader.loadMany(categoriesIds))
          .filter(Boolean)
          .map((category: any) => {
            return getLocalizedField(category?.fields, 'title', ctx);
          });

        if (categories.length) textArray.push(categories.join(', '));

        const pubDate = getLocalizedField(blog.fields, 'pubDate', ctx);
        if (pubDate) textArray.push(pubDate);
        const body = createRichText(textArray.join(' • '));
        return createType('Hero', {
          // variant: 'mediaOnRight',
          backgroundColor: 'coolGrey',
          title: getLocalizedField(blog.fields, 'title', ctx),
          body,
          images: getLocalizedField(blog.fields, 'featuredMedia', ctx) ?? []
        });
      }
    },

    Link: {
      text: 'title',
      href: pathResolver
    },

    NavigationItem: {
      text: 'title',
      href: pathResolver
    },

    Card: {
      overline: async (blog: any, _args: any, ctx: ApolloContext) => {
        let eventTime = getLocalizedField(blog.fields, 'pubDate', ctx);

        console.log({ eventTime });

        if (!eventTime) {
          return null;
        }

        return formatDate(eventTime);
      },
      body: async (blog: any, _args: any, ctx: ApolloContext) => {
        const promoSummary = getLocalizedField(blog.fields, 'promoSummary', ctx);

        if (promoSummary) {
          return await createRichText(promoSummary);
        }
        return null;
      },

      media: async (blog: any, args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ??
          getLocalizedField(blog.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (blog: any, _args: any, ctx: ApolloContext) => {
        return blog;
      },

      actions: async (blog: any, args: any, ctx: ApolloContext) => {
        const text = await getDefaultCtaText(blog, args, ctx);
        return [
          createType('Link', {
            id: blog.id,
            text,
            icon: 'logo',
            iconPosition: 'Left',
            href: await pathResolver(blog, args, ctx),
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
