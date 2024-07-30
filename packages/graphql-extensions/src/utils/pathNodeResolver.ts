import type { iPathNode } from '@last-rev/types';
import type { ApolloContext } from '../types';

export const pathNodeResolver = async (
  id: string,
  ctx: ApolloContext
): Promise<iPathNode | null> => {
  if (!id) return null;

  const pathReader = !!ctx.preview ? ctx.pathReaders?.preview : ctx.pathReaders?.prod;
  const pathTree = await pathReader?.getTree(process.env.SITE);
  const pathNodes = pathTree?.getNodesById(id);

  // Check if pathNodes is undefined or empty array
  if (!pathNodes || pathNodes.length === 0) return null;

  // Assuming pathNodes[0] is always of type iPathNode
  return pathNodes[0] as iPathNode;
};
