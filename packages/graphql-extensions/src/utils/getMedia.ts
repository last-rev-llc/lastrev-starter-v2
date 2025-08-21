import { getLocalizedField } from '@last-rev/graphql-cms-core';
import type { ApolloContext } from '../types';
import { pruneEmpty } from './pruneEmpty';
import { cleanSVG } from '../utils/cleanSVG';
import { optimize } from 'svgo';

export const getMedia = async (imageRef: any, ctx: ApolloContext) => {
  if (!imageRef?.sys?.id) return null;

  const image = await ctx.loaders.assetLoader.load({
    id: imageRef?.sys?.id,
    preview: !!ctx.preview
  });

  if (!image?.fields) return null;

  const file = getLocalizedField(image.fields, 'file', ctx);
  if (!file) return null;

  let svgContent = null;

  let url = file?.url?.startsWith('//') ? `https:${file.url}` : file?.url;

  if (url?.endsWith('.svg')) {
    try {
      const svgContentTemp = await fetch(url).then((res) => res.text());
      const svgContentCleaned = cleanSVG(svgContentTemp);

      const result = optimize(svgContentCleaned, {
        multipass: true // all other config fields are available here
      });

      svgContent = result?.data;

      // if an svg is this large we need to not show it as it bloats algolia too much
      if (svgContent?.length > 4000) {
        console.log(`Error inlining SVG content for URL: ${url}`);
        svgContent = null;
      }
    } catch (err) {
      console.log(`Error inlining SVG content for URL: ${url}`);
      console.log(err);
    }
  }

  return pruneEmpty({
    __typename: 'Media',
    title: getLocalizedField(image.fields, 'title', ctx),
    file: {
      url,
      ...file?.details?.image,
      svgContent
    },
    description: getLocalizedField(image.fields, 'description', ctx)
  });
};
