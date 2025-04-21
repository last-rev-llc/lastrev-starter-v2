import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import * as types from '@contentful/rich-text-types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pageFooterResolver } from './utils/pageFooterResolver';

export const typeMappings = {};

export const typeDefs = gql`
  extend type Settings {
    header: Header
    footer: Footer
    path: String
    # sideNav: [Content]
    hero: Hero
    contents: [Content]
  }
`;

interface Heading {
  [key: string]: number;
}

const HEADINGS: Heading = {
  [types.BLOCKS.HEADING_1]: 1,
  [types.BLOCKS.HEADING_2]: 2,
  [types.BLOCKS.HEADING_3]: 3,
  [types.BLOCKS.HEADING_4]: 4,
  [types.BLOCKS.HEADING_5]: 5,
  [types.BLOCKS.HEADING_6]: 6
};

export const mappers: Mappers = {
  Settings: {
    Settings: {
      path: async (settings: any, _args: any, ctx: ApolloContext) => {
        return '/frd';
      },

      hero: async (settings: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaBelow',
          backgroundColor: 'sapphire',
          title: 'Function Requirements Document'
        }),

      contents: 'frdContents',

      sideNav: async (settings: any, _args: any, ctx: ApolloContext) => {
        const tableOfContents: any = [];
        const contentRefs: any = getLocalizedField(settings.fields, 'frdContents', ctx);

        const contents = await ctx.loaders.entryLoader.loadMany(
          contentRefs?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
        );

        contents?.map((content: any) => {
          const title: any = getLocalizedField(content.fields, 'title', ctx);
          const subTitle: any = getLocalizedField(content.fields, 'subtitle', ctx);
          const sectionText = title || subTitle;

          if (sectionText) {
            const sectionHref = sectionText
              // reference: https://gist.github.com/codeguy/6684588
              .normalize('NFKD')
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .trim()
              .replace(/[-\s]+/g, '-');

            tableOfContents.push(
              createType('Link', {
                id: sectionHref,
                href: `#${sectionHref}`,
                text: sectionText
              })
            );
          }

          const body: any = getLocalizedField(content.fields, 'body', ctx);

          if (!body || !body.content) return [];
          const links = [];

          for (let item of body.content) {
            const headingLevel = HEADINGS[item.nodeType];

            if (!headingLevel || headingLevel > 2) continue;
            const value = item.content[0]?.value?.trim() as string;
            if (!value || value === '') continue;

            const href = value
              // reference: https://gist.github.com/codeguy/6684588
              .normalize('NFKD')
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .trim()
              .replace(/[-\s]+/g, '-');

            tableOfContents.push(
              createType('Link', {
                id: href,
                // TODO, this is adding a slash to the beginning of the link
                href: `#${href}`,
                text: value
              })
            );
          }
        });

        return tableOfContents;
      },

      header: pageHeaderResolver,

      footer: pageFooterResolver
    }
  }
};
