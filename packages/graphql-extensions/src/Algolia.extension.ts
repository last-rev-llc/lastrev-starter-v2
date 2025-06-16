import getLocalizedField from '@last-rev/graphql-cms-core/dist/utils/getLocalizedField';
import type { ApolloContext } from './types';

import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { pathResolver } from './utils/pathResolver';
import { generateCard } from './utils/generateCard';
import { getLink } from './utils/getLink';
import { getMedia } from './utils/getMedia';
import { getSysContentTypeName } from './utils/getSysContentTypeName';
import { pruneEmpty } from './utils/pruneEmpty';
import parseRichTextField from './utils/parseRichTextFields';
import { resolveContentFields } from './utils/resolveContentFields';
import { splitStringBySize } from './utils/splitStringBySize';
import { getSeoFieldValue } from './utils/getSeoFieldValue';

const index = 'cms';

const defaultFacets = {};

const defaultImage = { sys: { id: 'HRRJmIrxGXjwP1iPIwLYA' } };

export const mappers = {
  Blog: {
    AlgoliaRecord: {
      algoliaObjects: async (blog: any, args: any, ctx: ApolloContext) => {
        const seo = await getSeoFieldValue(blog, 'seo', ctx);
        if (!seo?.robots?.index) return [];

        const path = await pathResolver(blog, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(blog.fields, 'title', ctx);

        const pubDate = getLocalizedField(blog.fields, 'pubDate', ctx);

        const contentBodyFull = await parseRichTextField(
          getLocalizedField(blog.fields, 'body', ctx),
          ctx
        );

        const contentBody = splitStringBySize(contentBodyFull);

        const summary = getLocalizedField(blog.fields, 'promoSummary', ctx);

        const promoImageRef =
          getLocalizedField(blog.fields, 'promoImage', ctx) ??
          getLocalizedField(blog.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const entries: any[] = [];

        const contentType = getSysContentTypeName(blog);

        const link = await getLink(blog, args, ctx);

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

        const card = await generateCard({
          id: blog.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        let pubDateTimestamp: number | undefined = undefined;

        try {
          pubDateTimestamp = new Date(pubDate).getTime();
        } catch (err) {}

        return contentBody.map((body, i) => ({
          index,
          data: {
            ...defaultFacets,
            ...pruneEmpty({
              id: blog.sys.id,
              objectID: `${constructObjectId(blog, ctx)}_${i}`,
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              defaultSortField: ((pubDateTimestamp || 1) * -1).toString().replace('-', '0'),
              pubDate,
              categories,
              pubDateTimestamp,
              body,
              summary,
              path,
              contentType,
              card
            })
          }
        }));
      }
    }
  },
  Page: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const seo = await getSeoFieldValue(page, 'seo', ctx);
        if (!seo?.robots?.index) return [];

        const path = await pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);

        let contentSummaries = await resolveContentFields(page, args, ctx, false);

        const contentBody = splitStringBySize(
          Array.from(contentSummaries?.values() ?? [])
            .filter(Boolean)
            .join(' ')
        );

        const summary = getLocalizedField(page.fields, 'promoSummary', ctx);

        const promoImageRef =
          getLocalizedField(page.fields, 'promoImage', ctx) ??
          getLocalizedField(page.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const contentType = getSysContentTypeName(page);

        const link = await getLink(page, args, ctx);

        const categoriesRef = getLocalizedField(page?.fields, 'categories', ctx);
        const categoriesIds =
          categoriesRef?.map((content: any) => {
            return { id: content?.sys.id, preview: !!ctx.preview };
          }) ?? [];

        const categories: any[] = (await ctx.loaders.entryLoader.loadMany(categoriesIds))
          .filter(Boolean)
          .map((category: any) => {
            return getLocalizedField(category?.fields, 'title', ctx);
          });

        const entries: any[] = [];

        const card = await generateCard({
          id: page.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return contentBody.map((body, i) => ({
          index,
          data: {
            ...defaultFacets,
            ...pruneEmpty({
              id: page.sys.id,
              objectID: `${constructObjectId(page, ctx)}_${i}`,
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              pubDateTimestamp: new Date(page.sys.createdAt).getTime(),
              title,
              defaultSortField: title,
              categories,
              body,
              summary,
              path,
              contentType,
              card
            })
          }
        }));
      }
    }
  }
};
