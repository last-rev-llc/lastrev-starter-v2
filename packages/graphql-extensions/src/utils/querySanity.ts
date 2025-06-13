import type { ApolloContext } from '../types';
import { convertSanityDoc } from '@last-rev/sanity-mapper';

interface QueryArgs {
  contentType: string;
  filters?: { id: string; key: string }[];
  filter?: Record<string, any>;
  order?: string;
  limit?: number;
  skip?: number;
  ctx: ApolloContext;
}

// Helper to build GROQ filter string
const buildGroqFilter = (
  contentType: string,
  filter?: Record<string, any>,
  filters?: { id: string; key: string }[]
) => {
  let groq = `_type == "${contentType}"`;
  if (filters && filter) {
    for (const { id, key } of filters) {
      if (filter[id] !== undefined) {
        if (Array.isArray(filter[id])) {
          groq += ` && ${key} in ${JSON.stringify(filter[id])}`;
        } else {
          groq += ` && ${key} == ${JSON.stringify(filter[id])}`;
        }
      }
    }
  } else if (filter) {
    for (const key in filter) {
      if (Array.isArray(filter[key])) {
        groq += ` && ${key} in ${JSON.stringify(filter[key])}`;
      } else {
        groq += ` && ${key} == ${JSON.stringify(filter[key])}`;
      }
    }
  }
  return groq;
};

const query = async ({
  contentType,
  filters,
  filter,
  order,
  limit = 1000,
  skip = 0,
  ctx
}: QueryArgs): Promise<any[]> => {
  if (!ctx.sanity) throw new Error('Sanity client is not available on context');
  const groqFilter = buildGroqFilter(contentType, filter, filters);
  let groq = `*[${groqFilter} && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
    ...,
    "_translations": *[
      _type == "translation.metadata" &&
      references(^._id)
    ].translations[]{
      "doc": value->{
        ...
      }
    }[doc.__i18n_lang != $defaultLocale && defined(doc)]
  }`;
  if (order) {
    groq += ` | order(${order})`;
  }
  if (typeof skip === 'number' && typeof limit === 'number') {
    groq += `[${skip}...${skip + limit}]`;
  } else if (typeof limit === 'number') {
    groq += `[0...${limit}]`;
  }

  const client = ctx.preview ? ctx.sanity.preview : ctx.sanity.prod;
  console.log('groq', groq);
  const items = await client.fetch(groq, { defaultLocale: ctx.defaultLocale });
  // TODO: locale
  return items.map((item: any) => convertSanityDoc(item, ctx.defaultLocale, ctx.locales));
};

export const querySanity = async (args: QueryArgs): Promise<any[]> => {
  return query(args);
};
