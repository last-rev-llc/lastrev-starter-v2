import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { createType } from './utils/createType';

export const typeDefs = gql`
  extend type PageDocument {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    body: RichText
    mainImage: Media
    breadcrumbs: [Link]
    hero: Content
  }
`;

export const mappers: Mappers = {
  PageDocument: {
    PageDocument: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      relatedItems: async (doc: any, _args: any, ctx: ApolloContext) => {
        const relatedItems = getLocalizedField(doc.fields, 'relatedItems', ctx);

        if (!!relatedItems?.length) return null;

        return createType('Collection', {
          introText: createType('Text', { title: 'Related Documents' }),
          items: getLocalizedField(doc.fields, 'relatedItems', ctx) ?? [],
          variant: 'fourPerRow',
          itemsVariant: 'logo',
          itemsAspectRatio: 'horizontal',
          backgroundColor: 'coolGrey'
        });
      },

      hero: async (doc: any, _args: any, ctx: ApolloContext) => {
        const externalUrl = getLocalizedField(doc.fields, 'externalUrl', ctx);

        const text = getLocalizedField(doc.fields, 'promoLinkText', ctx) ?? 'View Document';

        const actions = !externalUrl
          ? []
          : [
              createType('Link', {
                id: doc.id,
                text,
                href: externalUrl,
                variant: 'buttonText'
              })
            ];

        return createType('Hero', {
          variant: 'mediaOnRightFullBleed',
          backgroundColor: 'white',
          showFullImage: true,
          title: getLocalizedField(doc.fields, 'title', ctx),
          sideImageItems: [getLocalizedField(doc.fields, 'promoImage', ctx)] ?? [],
          actions
        });
      }
    },

    Link: {
      text: 'name',
      href: pathResolver
    },

    NavigationItem: {
      text: 'name',
      href: pathResolver
    },

    Card: {
      body: async (pageDocument: any, _args: any, ctx: ApolloContext) => {
        const promoSummary = getLocalizedField(pageDocument.fields, 'promoSummary', ctx);

        if (promoSummary) {
          return await createRichText(promoSummary);
        }
        return null;
      },

      media: async (pageDocument: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(pageDocument.fields, 'promoImage', ctx) ??
          getLocalizedField(pageDocument.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (pageDocument: any, _args: any, ctx: ApolloContext) => {
        return pageDocument;
      },

      actions: async (pageDocument: any, args: any, ctx: ApolloContext) => {
        const text = getLocalizedField(pageDocument.fields, 'promoLinkText', ctx) ?? 'Read More';
        return [
          createType('Link', {
            id: pageDocument.id,
            text,
            href: await pathResolver(pageDocument, args, ctx),
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
