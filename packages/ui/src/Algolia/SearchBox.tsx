'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';

import { useSearchBox } from 'react-instantsearch-core';

const SearchBox = ({
  ownerState,
  searchAsYouType,
  minCharacters = 3,
  forceMinCharacters = false,
  cbOnChange,
  ...other
}: {
  ownerState: any;
  searchAsYouType: Boolean;
  minCharacters: number;
  forceMinCharacters?: Boolean;
  cbOnChange?: (isValid: boolean, query: string) => void;
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('query');

  const { query, refine } = useSearchBox(other);

  const [inputValue, setInputValue] = React.useState(query);
  const [helperText, setHelperText] = React.useState('');

  React.useEffect(() => {
    if (search) {
      setInputValue(search);
      refine(search);
      if (cbOnChange) cbOnChange(true, search);
    }
  }, [search]);

  return (
    <TextField
      id="keywords"
      fullWidth
      placeholder="Search by keyword"
      value={inputValue}
      helperText={helperText}
      variant="standard"
      color={ownerState.backgroundColor}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;

        setInputValue(newQuery);
        if (newQuery.length >= minCharacters) {
          refine(newQuery);
          if (cbOnChange) cbOnChange(true, newQuery);
          setHelperText('');
        } else {
          if (cbOnChange) cbOnChange(false, newQuery);
          setHelperText(`Please enter at least ${minCharacters} characters`);
        }
      }}
    />
  );
};

export default SearchBox;
