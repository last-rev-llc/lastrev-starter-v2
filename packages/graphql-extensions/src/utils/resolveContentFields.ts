import { getLocalizedField, documentToPlainTextString } from '@last-rev/graphql-cms-core';
import { ApolloContext } from '../types';
import { resolveField } from './resolveField';

const pageType = ['page', 'pageDocument', 'pageHr', 'blog'];

export const resolveContentFields = async (
  content: any,
  args: any,
  ctx: any,
  isNested: boolean = true
): Promise<Map<string, any>> => {
  return await resolveField(
    new Map([
      ['overline', 'overline'],
      ['title', 'title'],
      ['name', 'name'],
      ['jobTitle', 'jobTitle'],
      ['subtitle', 'subtitle'],
      [
        'body',
        async (root: { fields: any; sys: any }, _args: any, ctx: ApolloContext) => {
          if (!root) return null;
          if (isNested && pageType.includes(root.sys.contentType.sys.id)) {
            return getLocalizedField(root.fields, 'promoSummary', ctx);
          }
          const subBodyRte = getLocalizedField(root.fields, 'body', ctx);
          return subBodyRte ? documentToPlainTextString(subBodyRte) : '';
        }
      ],
      [
        'hero',
        async (root: { fields: any }, _args: any, ctx: any) => {
          const content = await resolveField('hero')(root, args, ctx);

          if (content) {
            const resolvedContent = await resolveContentFields(content, args, ctx, false);
            if (resolvedContent && typeof resolvedContent.values === 'function') {
              const retString = Array.from(resolvedContent.values()).filter(Boolean).join(' ');

              return retString;
            }
          }

          return '';
        }
      ],
      [
        'introText',
        async (root: { fields: any }, _args: any, ctx: any) => {
          const content = await resolveField('introText')(root, args, ctx);

          if (content) {
            const resolvedContent = await resolveContentFields(content, args, ctx, false);
            if (resolvedContent && typeof resolvedContent.values === 'function') {
              const retString = Array.from(resolvedContent.values()).filter(Boolean).join(' ');

              return retString;
            }
          }

          return '';
        }
      ],
      [
        'supplementalContent',
        async (root: { fields: any }, _args: any, ctx: any) => {
          const content = await resolveField('supplementalContent')(root, args, ctx);

          if (content) {
            const resolvedContent = await resolveContentFields(content, args, ctx);
            if (resolvedContent && typeof resolvedContent.values === 'function') {
              const retString = Array.from(resolvedContent.values()).filter(Boolean).join(' ');

              return retString;
            }
          }

          return '';
        }
      ],
      [
        'items',
        async (root: { fields: any }, _args: any, ctx: any): Promise<string> => {
          const contents = await resolveField('items')(root, args, ctx);

          if (contents) {
            const contentSummaries = await Promise.all(
              contents.map((content: any) => resolveContentFields(content, args, ctx))
            );

            if (contentSummaries && contentSummaries.length > 0) {
              return contentSummaries
                .map((content) =>
                  content && typeof content.values === 'function'
                    ? Array.from(content.values()).filter(Boolean).join(' ')
                    : ''
                )
                .join(' ');
            }
          }

          return '';
        }
      ],
      [
        'contents',
        async (root: { fields: any }, _args: any, ctx: any): Promise<string> => {
          const contents = await resolveField('contents')(root, args, ctx);

          if (contents) {
            const contentSummaries = await Promise.all(
              contents.map((content: any) => resolveContentFields(content, args, ctx))
            );

            if (contentSummaries && contentSummaries.length > 0) {
              return contentSummaries
                .map((content) =>
                  content && typeof content.values === 'function'
                    ? Array.from(content.values()).filter(Boolean).join(' ')
                    : ''
                )
                .join(' ');
            }
          }

          return '';
        }
      ]
    ] as [string, any][])
  )(content, args, ctx);
};
