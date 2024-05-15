import getLocalizedField from '@last-rev/graphql-contentful-core/dist/utils/getLocalizedField';

export const mediaFieldResolver = async ({ fields, field, assetField, ctx }: any) => {
  // TODO: Make getting a localized resolved link a single function
  const value: any = getLocalizedField(fields, assetField, ctx);
  if (value) return value;

  const assetRef: any = getLocalizedField(fields, field, ctx);
  if (!assetRef) return null;

  const asset = await ctx.loaders.assetLoader.load({
    id: assetRef?.sys?.id,
    preview: !!ctx.preview
  });
  const fieldValue: any = getLocalizedField(asset?.fields, assetField, ctx);

  return fieldValue;
};
