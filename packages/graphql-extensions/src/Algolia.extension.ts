import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';

import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { pathResolver } from './utils/pathResolver';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { generateCard } from './utils/generateCard';
import { getLink } from './utils/getLink';
import { getMedia } from './utils/getMedia';
import { getSysContentTypeName } from './utils/getSysContentTypeName';
import { pruneEmpty } from './utils/pruneEmpty';
import { formatNameForSorting } from './utils/formatNameForSorting';
import { resolveLocalizedField } from './utils/resolveLocalizedField';
import { resolveField } from './utils/resolveField';

const index = 'contentful';

const defaultFacets = {};

const defaultImage = { sys: { id: 'HRRJmIrxGXjwP1iPIwLYA' } };

export const mappers = {
  Blog: {
    AlgoliaRecord: {
      algoliaObjects: async (blog: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(blog, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(blog.fields, 'title', ctx);

        const pubDate = getLocalizedField(blog.fields, 'pubDate', ctx);

        const bodyRte = getLocalizedField(blog.fields, 'body', ctx);
        const body = bodyRte ? documentToPlainTextString(bodyRte) : '';

        const summary = getLocalizedField(blog.fields, 'promoSummary', ctx);

        const promoImageRef =
          getLocalizedField(blog.fields, 'promoImage', ctx) ??
          getLocalizedField(blog.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const entries: any[] = [];

        const contentType = getSysContentTypeName(blog);

        const link = await getLink(blog, args, ctx);

        const categoriesRef = getLocalizedField(blog?.fields, 'categories', ctx);
        const categoriesIds =
          categoriesRef?.map((content: any) => {
            return { id: content?.sys.id, preview: !!ctx.preview };
          }) ?? [];

        const categories: any[] = (await ctx.loaders.entryLoader.loadMany(categoriesIds))
          .filter(Boolean)
          .map((category: any) => {
            return getLocalizedField(category?.fields, 'title', ctx);
          });

        const card = await generateCard({
          id: blog.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        let pubDateTimestamp;

        try {
          pubDateTimestamp = new Date(pubDate).getTime();
        } catch (err) {}

        return [
          {
            index,
            data: {
              ...defaultFacets,
              ...pruneEmpty({
                objectID: constructObjectId(blog, ctx),
                locale: ctx.locale || ctx.defaultLocale,
                preview: !!ctx.preview,
                title,
                defaultSortField: ((pubDateTimestamp || 1) * -1).toString().replace('-', '0'),
                pubDate,
                categories,
                pubDateTimestamp,
                body,
                summary,
                promoImage,
                path,
                contentType,
                link,
                card
              })
            }
          }
        ];
      }
    }
  },
  // Person: {
  //   AlgoliaRecord: {
  //     algoliaObjects: async (person: any, args: any, ctx: ApolloContext) => {
  //       const path = await pathResolver(person, args, ctx);

  //       if (!path) return [];

  //       const name = getLocalizedField(person.fields, 'name', ctx);
  //       const firstName = getLocalizedField(person.fields, 'firstName', ctx);
  //       const lastName = getLocalizedField(person.fields, 'lastName', ctx);
  //       const subtitle = getLocalizedField(person.fields, 'jobTitle', ctx);
  //       const body = getLocalizedField(person.fields, 'body', ctx);
  //       const summary = getLocalizedField(person.fields, 'promoSummary', ctx);
  //       const promoImageRef =
  //         getLocalizedField(person.fields, 'promoImage', ctx) ??
  //         getLocalizedField(person.fields, 'mainImage', ctx) ??
  //         defaultImage;
  //       const promoImage = await getMedia(promoImageRef, ctx);
  //       const entries: any[] = [];

  //       const contentType = getSysContentTypeName(person);

  //       const department = getLocalizedField(person.fields, 'department', ctx);

  //       const link = await getLink(person, args, ctx);

  //       const card = await generateCard({
  //         id: person.sys.id,
  //         title: name,
  //         subtitle,
  //         summary,
  //         link,
  //         media: promoImage,
  //         entries,
  //         ctx
  //       });

  //       return [
  //         {
  //           index,
  //           data: {
  //             ...defaultFacets,
  //             ...pruneEmpty({
  //               objectID: constructObjectId(person, ctx),
  //               locale: ctx.locale || ctx.defaultLocale,
  //               preview: !!ctx.preview,
  //               title: name,
  //               defaultSortField: `${lastName}, ${firstName}`,
  //               subtitle,
  //               pubDateTimestamp: new Date(person.sys.createdAt).getTime(),
  //               body: documentToPlainTextString(body),

  //               email: getLocalizedField(person.fields, 'email', ctx),
  //               summary,
  //               promoImage,
  //               path,
  //               contentType,
  //               link,
  //               card
  //             })
  //           }
  //         }
  //       ];
  //     }
  //   }
  // },
  Page: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);

        const bodyRte = getLocalizedField(page.fields, 'body', ctx);
        let body = bodyRte ? documentToPlainTextString(bodyRte) : '';

        const pageType = ['person', 'pageHr', 'pageDocument', 'pageHr', 'blog'];

        // Helper function to resolve content fields
        const resolveContentFields = async (
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
                (root: { fields: any; sys: any }, _args: any, ctx: ApolloContext) => {
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
                      const retString = Array.from(resolvedContent.values())
                        .filter(Boolean)
                        .join(' ');

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
                      const retString = Array.from(resolvedContent.values())
                        .filter(Boolean)
                        .join(' ');

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
                      const retString = Array.from(resolvedContent.values())
                        .filter(Boolean)
                        .join(' ');

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

        let contentSummaries = await resolveContentFields(page, args, ctx, false);

        const contentBody = Array.from(contentSummaries?.values() ?? [])
          .filter(Boolean)
          .join(' ');
        body = `${body} ${contentBody}`;

        const summary = getLocalizedField(page.fields, 'promoSummary', ctx);

        const promoImageRef =
          getLocalizedField(page.fields, 'promoImage', ctx) ??
          getLocalizedField(page.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const contentType = getSysContentTypeName(page);

        const link = await getLink(page, args, ctx);

        const entries: any[] = [];

        const card = await generateCard({
          id: page.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return [
          {
            index,
            data: {
              ...defaultFacets,
              ...pruneEmpty({
                objectID: constructObjectId(page, ctx),
                locale: ctx.locale || ctx.defaultLocale,
                preview: !!ctx.preview,
                pubDateTimestamp: new Date(page.sys.createdAt).getTime(),
                title,
                defaultSortField: title,
                body,
                summary,
                path,
                contentType,
                link,
                card
              })
            }
          }
        ];
      }
    }
  },
  PageHr: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);

        const bodyRte = getLocalizedField(page.fields, 'body', ctx);
        let body = bodyRte ? documentToPlainTextString(bodyRte) : '';

        // Code of Ethics Children
        let ccSummary = await resolveField('codeOfConduct.promoSummary')(page, args, ctx);
        let ceSummary = await resolveField('codeOfEthics.promoSummary')(page, args, ctx);

        if (ccSummary || ceSummary) {
          body = `${body} Code of Conduct & Ethics ${ccSummary} ${ceSummary}`;
        }

        // Benefits Children
        let benefitSummaries = (await resolveField('benefitDocs')(page, args, ctx))
          ?.map((doc: { fields: any }) => getLocalizedField(doc.fields, 'promoSummary', ctx))
          .filter(Boolean);

        if (!!benefitSummaries.length) {
          body = `${body} Benefits ${benefitSummaries.join(' ')}`;
        }

        // Policies Children
        let policySummaries = (await resolveField('policiesDocs')(page, args, ctx))
          ?.map((doc: { fields: any }) => getLocalizedField(doc.fields, 'promoSummary', ctx))
          .filter(Boolean);

        if (!!policySummaries.length) {
          body = `${body} Policies ${policySummaries.join(' ')}`;
        }

        // Holidays Children
        let holidaySummaries = (await resolveField('holidayDocs')(page, args, ctx))
          ?.map((doc: { fields: any }) => getLocalizedField(doc.fields, 'promoSummary', ctx))
          .filter(Boolean);

        if (!!holidaySummaries.length) {
          body = `${body} Holidays ${holidaySummaries.join(' ')}`;
        }

        const summary = getLocalizedField(page.fields, 'promoSummary', ctx);

        const promoImageRef =
          getLocalizedField(page.fields, 'promoImage', ctx) ??
          getLocalizedField(page.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const contentType = getSysContentTypeName(page);

        const link = await getLink(page, args, ctx);

        const entries: any[] = [];

        const card = await generateCard({
          id: page.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return [
          {
            index,
            data: {
              ...defaultFacets,
              ...pruneEmpty({
                objectID: constructObjectId(page, ctx),
                locale: ctx.locale || ctx.defaultLocale,
                preview: !!ctx.preview,
                pubDateTimestamp: new Date(page.sys.createdAt).getTime(),
                title,
                defaultSortField: title,
                body,
                summary,
                path,
                contentType,
                link,
                card
              })
            }
          }
        ];
      }
    }
  },
  PageDocument: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);

        const bodyRte = getLocalizedField(page.fields, 'body', ctx);
        const body = bodyRte ? documentToPlainTextString(bodyRte) : '';

        const summary = getLocalizedField(page.fields, 'promoSummary', ctx);
        // const promoImage =
        //   (await getMedia(getLocalizedField(page.fields, 'promoImage', ctx), ctx)) ?? defaultImage;
        const promoImageRef =
          getLocalizedField(page.fields, 'promoImage', ctx) ??
          getLocalizedField(page.fields, 'featuredMedia', ctx) ??
          defaultImage;
        const promoImage = await getMedia(promoImageRef, ctx);

        const contentType = getSysContentTypeName(page);

        const link = await getLink(page, args, ctx);

        const entries: any[] = [];

        const card = await generateCard({
          id: page.sys.id,
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return [
          {
            index,
            data: {
              ...defaultFacets,
              ...pruneEmpty({
                objectID: constructObjectId(page, ctx),
                locale: ctx.locale || ctx.defaultLocale,
                preview: !!ctx.preview,
                pubDateTimestamp: new Date(page.sys.createdAt).getTime(),
                title,
                defaultSortField: title,
                body,
                summary,
                path,
                contentType,
                link,
                card
              })
            }
          }
        ];
      }
    }
  }
};
