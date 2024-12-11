'use client';
import React from 'react';

import { usePagination } from 'react-instantsearch-core';

import { default as MuiPagination } from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Icon } from '../Icons/Icon';

//https://www.algolia.com/doc/api-reference/widgets/pagination/react/#hook
const Pagination = (props: any) => {
  const { currentRefinement, nbPages, refine } = usePagination(props);
  const page = Number.isInteger(currentRefinement) ? currentRefinement + 1 : 1;

  const ChevronLeftIcon = React.useMemo(
    () => (props: { color: string }) => <Icon iconName="chevronLeft" {...props} />,
    []
  );
  const ChevronRightIcon = React.useMemo(
    () => (props: { color: string }) => <Icon iconName="chevronRight" {...props} />,
    []
  );

  return (
    <MuiPagination
      renderItem={(item) => (
        <PaginationItem
          {...item}
          components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
        />
      )}
      count={nbPages ?? 1}
      page={page}
      defaultPage={1}
      boundaryCount={1}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => {
        refine(value - 1);
      }}
    />
  );
};

export default Pagination;
