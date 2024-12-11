'use client';
import { type SearchClient } from 'algoliasearch';

type initIndexProps = {
  searchClient: SearchClient;
  index: string;
};

export const initIndex = ({ searchClient, index: indexName }: initIndexProps): any => {
  const index = searchClient.initIndex(indexName);
  return index;
};
