'use client';
import algoliasearch, { type SearchClient } from 'algoliasearch';

const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID as string;

export const createSearchClient = (searchKey: string): SearchClient => {
  const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, searchKey);
  return searchClient;
};
