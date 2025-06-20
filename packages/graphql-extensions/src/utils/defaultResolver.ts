import type { ApolloContext } from '../types';
import { getLocalizedField } from '@last-rev/graphql-cms-core';
import { camelCase } from './camelCase';

interface DefaultResolverParams {
  defaultValue?: string;
  mappings?: {
    [key: string]: string | number | null;
  };
  camelize?: boolean;
}

export const defaultResolver =
  (field: string, params: DefaultResolverParams = {}) =>
  (ref: any, _args: any, ctx: ApolloContext) => {
    const item = getLocalizedField(ref?.fields, field, ctx) ?? ref?.fields?.[field];
    if (params.mappings?.[item] || params.mappings?.[item] === null) return params.mappings?.[item];
    if (item) return params.camelize ? item : camelCase(item);
    if (params.defaultValue)
      return params.camelize ? params.defaultValue : camelCase(params.defaultValue);
    return;
  };
