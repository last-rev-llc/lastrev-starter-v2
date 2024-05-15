import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '../types';

export const siteMediaContactPhoneResolver = (root: any, _args: any, ctx: ApolloContext) => {
  return getLocalizedField(root.fields, 'mediaContactPhone', ctx);
};
