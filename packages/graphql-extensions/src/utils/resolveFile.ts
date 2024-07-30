import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';

import type { ApolloContext } from '../types';

import { mediaFieldResolver } from './mediaFieldResolver';
import { getVideoEmbedUrl } from './getVideoEmbedUrl';

export const resolveFile = async (media: any, _args: any, ctx: ApolloContext) => {
  let file: any = media?.file;
  const assetFile = await mediaFieldResolver({
    fields: media?.fields,
    field: 'asset',
    assetField: 'file',
    ctx
  });
  if (assetFile) {
    file = assetFile;
  }
  const assetUrl: any = getLocalizedField(media?.fields, 'assetUrl', ctx);
  if (assetUrl) {
    file = { url: getVideoEmbedUrl(assetUrl) ?? assetUrl };
  }
  return file;
};
