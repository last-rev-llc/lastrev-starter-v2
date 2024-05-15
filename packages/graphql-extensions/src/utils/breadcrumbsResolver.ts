///
import type { ApolloContext } from '../types';
import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';

const getParentPages = async (page: any, ctx: ApolloContext, pages: any[] = []): Promise<any[]> => {
  const parentPageRef = getDefaultFieldValue(page, 'parentPage', ctx.defaultLocale);

  if (parentPageRef) {
    const parentPage = await ctx.loaders.entryLoader.load({
      id: parentPageRef.sys.id,
      preview: !!ctx.preview
    });

    if (parentPage) {
      const slug = getDefaultFieldValue(parentPage as any, 'slug', ctx.defaultLocale);
      pages.unshift(parentPage);
      return getParentPages(parentPage, ctx, pages);
    }
  }

  return pages;
};

export const breadcrumbsResolver = async (item: any, _args: any, ctx: ApolloContext) =>
  await getParentPages(item, ctx, [item]);
