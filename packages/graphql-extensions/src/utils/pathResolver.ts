import { getLocalizedField, pathNodeResolver } from '@last-rev/graphql-cms-core';

import type { ApolloContext } from '../types';

// const fixDriveLink = (url: string): string => {
//   const urlObject = new URL(url);
//   const pathSegments = urlObject.pathname.split('/');

//   if (pathSegments[pathSegments.length - 1] !== 'preview') {
//     // Replace the last segment with "preview"
//     pathSegments[pathSegments.length - 1] = 'preview';
//     // Update the pathname with the new path
//     urlObject.pathname = pathSegments.join('/');
//   }

//   return urlObject.toString();
// };

export const pathResolver = async (content: any, _args: any, ctx: ApolloContext) => {
  const id = content.sys.id;

  if (id) {
    const pathNode = await pathNodeResolver(id, ctx);

    const path = ((pathNode?.data as any)?.linkPath as any) || (pathNode?.data as any)?.fullPath;
    if (path) return path;
  }

  const manualUrl = getLocalizedField(content.fields, 'manualUrl', ctx);
  if (manualUrl) return manualUrl;

  const externalUrl = getLocalizedField(content.fields, 'externalUrl', ctx);

  if (externalUrl) {
    const googleId = await getLocalizedField(content?.fields, 'googleId', ctx);
    if (googleId) {
      return `https://drive.google.com/file/d/${googleId}/preview`;
      // if (externalUrl?.includes('document')) return `${externalUrl}?embedded=true`;

      // if (externalUrl?.includes('spreadsheets'))
      //   return `${externalUrl}?widget=true&amp;headers=false`;

      // if (externalUrl?.includes('presentation') && externalUrl?.includes('pub'))
      //   return externalUrl.replace('/pub', '/embed');

      // if (externalUrl?.startsWith('https://drive.google.com')) {
      //   return fixDriveLink(externalUrl);
      // }
    }

    return externalUrl;
  }

  return '#';
};
