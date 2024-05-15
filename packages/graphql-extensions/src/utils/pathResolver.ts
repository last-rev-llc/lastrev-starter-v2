import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pathNodeResolver } from './pathNodeResolver';

import type { ApolloContext } from '../types';

export const pathResolver = async (content: any, _args: any, ctx: ApolloContext) => {
  const id = content.sys.id;

  if (id) {
    const pathNode = await pathNodeResolver(id, ctx);

    return ((pathNode?.data as any)?.linkPath as any) || (pathNode?.data as any)?.fullPath;
  }

  const manualUrl = getLocalizedField(content.fields, 'manualUrl', ctx);
  if (manualUrl) return manualUrl;
  return '#';
};
