'use client';
import React from 'react';

import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { Configure } from 'react-instantsearch';

import { createSearchClient } from './createSearchClient';

type AlgoliaSearch = {
  children: any;
  algoliaSettings?: any;
  algoliaSearchKey: string;
};

export const AlgoliaSearch = ({ children, algoliaSettings, algoliaSearchKey }: AlgoliaSearch) => {
  const searchClient = createSearchClient(algoliaSearchKey);
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={algoliaSettings?.indexName}
      initialUiState={
        !!algoliaSettings?.initialUiState
          ? {
              [algoliaSettings?.indexName]: {
                ...algoliaSettings.initialUiState
              }
            }
          : {}
      }>
      {!!algoliaSettings?.configure ? <Configure {...algoliaSettings.configure} /> : null}
      {children}
    </InstantSearchNext>
  );
};

export default AlgoliaSearch;
