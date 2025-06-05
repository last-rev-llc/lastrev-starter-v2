import type { Entry } from 'contentful';

import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pathNodeResolver } from './utils/pathNodeResolver';

import type { ApolloContext } from './types';
import gql from 'graphql-tag';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

const ACTION_LINK_TYPES = ['Link'];

export const typeDefs = gql`
  union ActionLink = ${ACTION_LINK_TYPES.join('| ')}
`;

export const resolvers = {
  ActionLink: {
    __resolveType: (item: any) => {
      return 'Link';
    }
  },
  Query: {
    page: async (
      _: any,
      {
        path,
        locale,
        preview = false,
        site
      }: { path?: string; locale?: string; preview?: boolean; site?: string },
      ctx: ApolloContext
    ) => {
      if (!path) throw new Error('MissingArgumentPath');
      ctx.locale = locale || ctx.defaultLocale;
      ctx.preview = preview;
      ctx.path = path;

      const pathEntries = await ctx.loadEntriesForPath(path, ctx, site);

      if (!pathEntries?.length) return null;

      ctx.pathEntries = pathEntries;

      const siteSettings = await ctx.loaders.entryLoader.load({
        id: SITE_ID!,
        preview: !!ctx.preview
      });
      ctx.siteSettings = siteSettings;

      return pathEntries.reduce((acc: any, curr: any) => (curr ? curr : acc), null as any);
    },
    sitemapPage: async (
      _: never,
      {
        contentType,
        locale,
        preview = false,
        site,
        page
      }: {
        contentType: string;
        locale: string;
        preview?: boolean;
        site: string;
        page: number;
      },
      ctx: ApolloContext
    ) => {
      ctx.preview = !!preview;

      const maxPageSize = 100; //config.sitemap.maxPageSize;

      const buildSitemapPath = (path: string) =>
        `${locale === ctx.defaultLocale ? '' : `${locale}/`}${path.replace(/^\//, '')}`;

      const ids = (
        await ctx.contentful![preview ? 'preview' : 'prod'].getEntries({
          content_type: contentType,
          select: `sys.id`,
          limit: maxPageSize,
          skip: (page - 1) * maxPageSize,
          order: 'sys.updatedAt'
        })
      ).items.map((item: Entry<any>) => item.sys.id);

      const entries = (
        await ctx.loaders.entryLoader.loadMany(ids.map((id: string) => ({ id, preview })))
      ).filter((e: any) => !!e && !(e instanceof Error)) as Entry<any>[];

      const sitemapEntries = (
        await Promise.all(
          entries.map(async (entry) => {
            const seo = getLocalizedField(entry.fields, 'seo', ctx);
            if (seo?.['robots']?.value?.startsWith('noindex')) {
              return [];
            }

            const pathNode = await pathNodeResolver(entry.sys.id, ctx);

            if (pathNode?.data?.excludedLocales?.includes(locale)) {
              return [];
            }

            const paths = await ctx.loadPathsForContent(entry, ctx, site);

            return paths.map((p: any) => ({
              loc: buildSitemapPath(p.path),
              lastmod: entry.sys.updatedAt
            }));
          })
        )
      ).flat();

      return {
        entries: sitemapEntries
      };
    }
  }
};
