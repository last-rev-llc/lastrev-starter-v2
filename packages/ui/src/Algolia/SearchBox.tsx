'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText'; // Import FormHelperText

import { useSearchBox } from 'react-instantsearch-core';

const SearchBox = ({
  ownerState,
  searchAsYouType,
  minCharacters = 3,
  forceMinCharacters = false,
  cbOnChange,
  sx,
  ...other
}: {
  ownerState: any;
  searchAsYouType: Boolean;
  minCharacters: number;
  forceMinCharacters?: Boolean;
  sx?: any;
  cbOnChange?: (isValid: boolean, query: string) => void;
}) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('query');

  const { query, refine } = useSearchBox(other);

  const [inputValue, setInputValue] = React.useState(query);
  const [helperText, setHelperText] = React.useState('');

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    if (search) {
      setInputValue(search);

      if (search.length >= minCharacters || !search?.length) {
        refine(search);
        if (cbOnChange) cbOnChange(true, search);
        if (isMounted) setHelperText(''); // Check if component is mounted
      } else {
        if (cbOnChange) cbOnChange(false, search);
        if (isMounted) setHelperText(`Please enter at least ${minCharacters} characters`);
      }
    }

    return () => {
      isMounted = false; // Cleanup function to set the flag to false
    };
  }, [search, minCharacters, refine, cbOnChange]);

  return (
    <>
      <TextField
        id="keywords"
        fullWidth
        placeholder="Search by keyword"
        value={inputValue}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{
          ...sx
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newQuery = event.target.value;

          setInputValue(newQuery);
          if (newQuery.length >= minCharacters || !newQuery?.length) {
            refine(newQuery);
            if (cbOnChange) cbOnChange(true, newQuery);
            setHelperText('');
          } else {
            if (cbOnChange) cbOnChange(false, newQuery);
            setHelperText(`Please enter at least ${minCharacters} characters`);
          }
        }}
      />
      <FormHelperText
        style={{
          position: 'absolute',
          top: '100%', // Position it right below the TextField
          left: 0,
          margin: '0 0 0 16px', // Adjust margin as needed
          color: 'red'
        }}>
        {helperText}
      </FormHelperText>
    </>
  );
};

export default SearchBox;
