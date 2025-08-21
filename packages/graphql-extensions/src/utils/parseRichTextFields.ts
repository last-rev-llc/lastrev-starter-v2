import { documentToPlainTextString } from '@last-rev/graphql-cms-core';
import { Document, ApolloContext } from '@last-rev/types';
import { resolveContentFields } from './resolveContentFields';

const parseNode = async (node: any, ctx: ApolloContext): Promise<any> => {
  if (node?.data?.target?.sys?.type === 'Link' && node?.data?.target?.sys?.linkType === 'Entry') {
    const entryId = node.data.target.sys.id;
    const entry = await ctx.loaders.entryLoader.load({ id: entryId, preview: !!ctx.preview });
    const resolvedContent = await resolveContentFields(entry, null, ctx);

    const contentBody = Array.from(resolvedContent?.values() ?? [])
      .filter(Boolean)
      .join(' ');

    return {
      ...node,
      content: [{ nodeType: 'text', value: contentBody, marks: [], data: {} }]
    };
  } else if (Array.isArray(node.content)) {
    const parsedContent = await Promise.all(
      node.content.map((child: any) => parseNode(child, ctx))
    );
    return {
      ...node,
      content: parsedContent
    };
  }

  return node;
};

async function parseRichTextField(
  richText: Document | any | undefined,
  ctx: ApolloContext
): Promise<string> {
  if (!richText) return '';

  const parsedRichText = await parseNode(richText, ctx);

  return documentToPlainTextString(parsedRichText);
}

export default parseRichTextField;
