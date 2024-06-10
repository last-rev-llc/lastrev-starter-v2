import type { ApolloContext } from '../types';

import { isEmpty } from './isEmpty';
import { pruneEmpty } from './pruneEmpty';
import { getLocalizedFieldReference } from './getLocalizedFieldReference';

/*
 * @param { string | string[] | { [key: string]: string } | Map<string, string> } setting
 *
 * Resolve fields based on various setting types
 */

type Setting =
  | string
  | Setting[]
  | { [key: string]: string }
  | Map<string, any>
  | ((root: any, arg: any, ctx: ApolloContext) => any);

export const resolveField =
  (setting: Setting): any =>
  async (root: any, args: any, ctx: ApolloContext) => {
    if (typeof setting === 'string') {
      // If the setting is a string, resolve to that field
      // If there are multiple segments, resolve each segment from the previous value
      const segments = setting.split('.');

      let parent = root;
      let value;
      for (const segment of segments) {
        if (parent?.fields) {
          value = await getLocalizedFieldReference(parent.fields, segment, ctx);
          parent = value;
        }
      }
      return value;
    } else if (Array.isArray(setting)) {
      // If the setting is an array, fallback resolution in order
      for (const field of setting) {
        const value = await resolveField(field)(root, args, ctx);
        if (value) {
          return value;
        }
      }
    } else if (setting instanceof Map) {
      // If the setting is a Map, resolve each key recursively and return a new Map
      const acc = new Map<string, any>();

      await Promise.all(
        Array.from(setting.entries()).map(async ([key, value]) => {
          const resolvedValue = await resolveField(value)(root, args, ctx);

          acc.set(key, resolvedValue);

          return resolvedValue;
        })
      );

      if (!isEmpty(pruneEmpty(Object.fromEntries(acc)))) return acc;
    } else if (typeof setting === 'object') {
      // If the setting is an object, resolve each key recursively
      const acc: any = {};

      await Promise.all(
        Object.keys(setting).map(async (key) => {
          acc[key] = await resolveField(setting[key])(root, args, ctx);
          return acc[key];
        })
      );

      if (!isEmpty(pruneEmpty(acc))) return acc;
    } else if (typeof setting === 'function') {
      // If the setting is a function, resolve the field by calling it as a resolver
      return setting(root, args, ctx);
    }
  };
