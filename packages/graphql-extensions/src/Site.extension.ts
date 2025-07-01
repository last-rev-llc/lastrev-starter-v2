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
    }
  }
};
