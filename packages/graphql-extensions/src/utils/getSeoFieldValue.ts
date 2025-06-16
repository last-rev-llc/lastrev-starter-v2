import { getLocalizedField } from '@last-rev/graphql-cms-core';
import { ApolloContext } from '@last-rev/types';

export type SeoMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title: string;
    description: string;
    images?: string[];
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
};

const getImageUrl = async (imageRef: any, ctx: ApolloContext) => {
  const imageObject = imageRef
    ? await ctx.loaders.assetLoader.load({ id: imageRef.sys?.id, preview: !!ctx.preview })
    : null;
  return imageObject ? getLocalizedField(imageObject.fields, 'file', ctx)?.url || '' : '';
};

export const getSeoFieldValue = async (
  item: any,
  field: string,
  ctx: ApolloContext
): Promise<SeoMetadata | null> => {
  const seo = getLocalizedField(item.fields, field, ctx);
  if (ctx.cms === 'Sanity') {
    const ogImage = await getImageUrl(seo?.ogImage, ctx);
    const twImage = await getImageUrl(seo?.twImage, ctx);

    return {
      title: seo?.title || '',
      description: seo?.description || '',
      keywords: seo?.keywords || [],
      openGraph: {
        title: seo?.ogTitle || seo?.title || '',
        description: seo?.ogDescription || seo?.description || '',
        url: seo?.canonicalUrl || '',
        images: ogImage ? [{ url: ogImage }] : undefined
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.twTitle || seo?.title || '',
        description: seo?.twDescription || seo?.description || '',
        images: twImage ? [twImage] : ogImage ? [ogImage] : undefined
      },
      robots: {
        index: !!seo?.index,
        follow: !!seo?.follow
      }
    };
  }

  if (ctx.cms === 'Contentful') {
    const ogImage = seo?.['og:image']?.value;
    const twImage = seo?.['twitter:image']?.value;

    return {
      title: seo?.['title']?.value || '',
      description: seo?.['description']?.value || '',
      keywords: seo?.['keywords']?.value ? [seo['keywords'].value] : [],
      openGraph: {
        title: seo?.['og:title']?.value || seo?.['title']?.value || '',
        description: seo?.['og:description']?.value || seo?.['description']?.value || '',
        url: seo?.['canonical']?.value || '',
        images: ogImage ? [{ url: ogImage.url }] : undefined
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.['twitter:title']?.value || seo?.['title']?.value || '',
        description: seo?.['twitter:description']?.value || seo?.['description']?.value || '',
        images: twImage ? [twImage.url] : ogImage ? [ogImage.url] : undefined
      },
      robots: {
        index: seo?.['robots']?.value?.includes('index') ?? true,
        follow: seo?.['robots']?.value?.includes('follow') ?? true
      }
    };
  }

  return null;
};
