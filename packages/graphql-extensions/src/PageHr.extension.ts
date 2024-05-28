import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pathResolver } from './utils/pathResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { createType } from './utils/createType';

export const typeMappings = {};

export const typeDefs = gql`
  extend type PageHr {
    header: Header
    footer: Footer
    path: String
    hero: Hero
    contents: [Content]
    breadcrumbs: [Link]
    codeCollection: Collection
    benefitsCollection: Collection
    policiesCollection: Collection
    holidaysCollection: Collection
  }
`;

const getCollectionVariant = (itemCount: number) => {
  switch (itemCount) {
    case 1:
    case 2:
    case 3:
    case 5:
      return 'threePerRow';

    case 4:
      return 'fourPerRow';

    default:
      return 'threePerRow';
  }
};

export const mappers: Mappers = {
  PageHr: {
    PageHr: {
      path: pathResolver,

      header: pageHeaderResolver,

      footer: pageFooterResolver,

      breadcrumbs: breadcrumbsResolver,

      contents: async (page: any, _args: any, ctx: ApolloContext) => {
        const contents = getLocalizedField(page.fields, 'contents', ctx) ?? [];
        const pageTitle = getLocalizedField(page.fields, 'title', ctx);

        const navigationItems = [];

        //////////
        // Code of Ethics Collection
        //////////

        let codeItems = [
          getLocalizedField(page.fields, 'codeOfConduct', ctx),
          getLocalizedField(page.fields, 'codeOfEthics', ctx)
        ].filter(Boolean);

        if (codeItems?.length) {
          const codeTitle = 'Code of Conduct & Ethics';
          const codeAnchor = 'code-of-conduct';

          contents.push(
            createType('Collection', {
              introText: createType('Text', { title: codeTitle }),
              anchorId: codeAnchor,
              items: codeItems,
              variant: getCollectionVariant(codeItems?.length),
              itemsVariant: 'logo',
              itemsAspectRatio: 'horizontal',
              backgroundColor: 'coolGrey'
            })
          );

          navigationItems.push(
            createType('Link', {
              // id: `${page.sys.id}-${codeAnchor}`,
              text: codeTitle,
              href: `#${codeAnchor}`,
              variant: 'buttonContained'
            })
          );
        }

        //////////
        // Benefits Collection
        //////////

        const benefits = getLocalizedField(page.fields, 'benefitDocs', ctx) ?? [];

        if (!!benefits?.length) {
          const benefitsTitle = 'Benefits';
          const benefitsAnchor = 'benefits';
          contents.push(
            createType('Collection', {
              introText: createType('Text', { title: benefitsTitle }),
              anchorId: benefitsAnchor,
              items: benefits,
              variant: getCollectionVariant(benefits?.length),
              itemsVariant: 'logo',
              itemsAspectRatio: 'horizontal',
              backgroundColor: 'coolGrey'
            })
          );

          navigationItems.push(
            createType('Link', {
              // id: `${page.sys.id}-${benefitsAnchor}`,
              text: benefitsTitle,
              href: `#${benefitsAnchor}`,
              variant: 'buttonContained'
            })
          );
        }

        //////////
        // Policies Collection
        //////////

        const policies = getLocalizedField(page.fields, 'policiesDocs', ctx) ?? [];

        if (!!policies?.length) {
          const policiesTitle = 'Policies';
          const policiesAnchor = 'policies';

          contents.push(
            createType('Collection', {
              introText: createType('Text', { title: policiesTitle }),
              anchorId: policiesAnchor,
              items: policies,
              variant: getCollectionVariant(policies?.length),
              itemsVariant: 'logo',
              itemsAspectRatio: 'horizontal',
              backgroundColor: 'coolGrey'
            })
          );

          navigationItems.push(
            createType('Link', {
              // id: `${page.sys.id}-${policiesAnchor}`,
              text: policiesTitle,
              href: `#${policiesAnchor}`,
              variant: 'buttonContained'
            })
          );
        }

        //////////
        // Holidays Collection
        //////////

        let holidays = getLocalizedField(page.fields, 'holidayDocs', ctx) ?? [];

        if (!!holidays?.length) {
          const holidaysTitle = 'Holidays';
          const holidaysAnchor = 'holidays';

          contents.push(
            createType('Collection', {
              introText: createType('Text', { title: holidaysTitle }),
              anchorId: holidaysAnchor,
              items: holidays,
              variant: getCollectionVariant(holidays?.length),
              itemsVariant: 'logo',
              itemsAspectRatio: 'horizontal',
              backgroundColor: 'coolGrey'
            })
          );

          navigationItems.push(
            createType('Link', {
              id: `${page.sys.id}-${holidaysAnchor}`,
              text: holidaysTitle,
              href: `#${holidaysAnchor}`
            })
          );
        }

        //////////
        // Navigation Collection
        //////////

        if (!!navigationItems?.length) {
          const navigation = createType('Collection', {
            introText: createType('Text', { title: `${pageTitle} HR Resources` }),
            variant: 'fourPerRow',
            items: [navigationItems[3]],
            itemsVariant: 'linkList',
            itemsAspectRatio: 'horizontal',
            backgroundColor: 'periwinkle'
          });

          contents.unshift(navigation);
        }

        return contents;
      },

      hero: async (page: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaOnRight',
          backgroundColor: 'transparentLight',
          background: getLocalizedField(page.fields, 'heroImage', ctx),
          title: getLocalizedField(page.fields, 'title', ctx)
        })
    },

    Link: {
      href: pathResolver,
      text: 'title'
    },

    NavigationItem: {
      href: pathResolver,
      text: 'title'
    },

    Card: {
      body: async (page: any, _args: any, ctx: ApolloContext) => {
        const promoSummary = getLocalizedField(page.fields, 'promoSummary', ctx);

        if (promoSummary) {
          return await createRichText(promoSummary);
        }
        return null;
      },

      media: async (page: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(page.fields, 'promoImage', ctx) ??
          getLocalizedField(page.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (page: any, _args: any, ctx: ApolloContext) => {
        return page;
      },

      actions: async (page: any, args: any, ctx: ApolloContext) => {
        const text = getLocalizedField(page.fields, 'promoLinkText', ctx) ?? 'Read More';
        return [
          createType('Link', {
            id: page.id,
            text,
            href: await pathResolver(page, args, ctx)
          })
        ];
      }
    }
  }
};
