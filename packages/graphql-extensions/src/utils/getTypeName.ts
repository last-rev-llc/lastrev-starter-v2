import type { ContentType } from '@last-rev/types';
import { isString } from './isString';
import { capitalizeFirst } from './capitalizeFirst';

export const getTypeName = (contentType: ContentType | string): string => {
  const contentTypeId = isString(contentType) ? contentType : (contentType as ContentType)?.sys?.id;

  return capitalizeFirst(String(contentTypeId)) ?? '';
};
