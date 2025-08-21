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
  (field: string, { camelize = false, mappings, defaultValue }: DefaultResolverParams = {}) =>
  (ref: any, _args: any, ctx: ApolloContext) => {
    const item = ref?.[field] ?? getLocalizedField(ref?.fields, field, ctx);
    if (mappings?.[item] || mappings?.[item] === null) return mappings?.[item];
    if (item) return camelize ? camelCase(item) : item;
    if (defaultValue) return camelize ? camelCase(defaultValue) : defaultValue;
    return;
  };
