'use client';
import React, { useEffect, useState } from 'react';

import { useInfiniteHits } from 'react-instantsearch-core';

import Hit from './Hit';

// https://www.algolia.com/doc/api-reference/widgets/infinite-hits/react/#hook
const InfiniteHits = ({ ownerState, ...other }: { ownerState: any }) => {
  const { hits, showMore, isLastPage } = useInfiniteHits(other);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Skip rendering on server-side

  return (
    <>
      {hits.map((hit, index) => (
        <Hit key={`hit-${index}-${hit.id}`} hit={hit} ownerState={ownerState} />
      ))}
      <button onClick={showMore} disabled={isLastPage}>
        Show more results
      </button>
    </>
  );
};

export default InfiniteHits;
