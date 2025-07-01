import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/cms-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';

import Hits from './Hits';
import SearchBox from './SearchBox';
import AlgoliaSearch from './AlgoliaSearch';
import Card from '../Card';
import Background from '../Background';

import { layoutConfig } from '../Collection/Collection.theme';

const AutoComplete = (props: any) => {
  const variant = 'onePerRow';
  const itemsVariant = 'autocomplete';
  const [showResults, setShowResults] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const ownerState = {
    ...props,
    ...props.ownerState,
    variant,
    itemsVariant
  };

  const cbOnChange = (isValid: boolean, query: string) => {
    setShowResults(isValid);
  };

  const { sidekickLookup, algoliaSettings, algoliaSearchKey } = props;

  return (
    <ErrorBoundary>
      <Root
        ownerState={ownerState}
        {...sidekick(sidekickLookup)}
        data-testid={`AutoComplete-${variant}`}>
        <AutoCompleteBackground
          backgroundColor={ownerState.backgroundColor}
          testId="AutoComplete-background"
        />
        <AlgoliaSearch algoliaSettings={algoliaSettings} algoliaSearchKey={algoliaSearchKey}>
          <SearchBoxWrap ownerState={ownerState}>
            <SearchBox
              ownerState={ownerState}
              searchAsYouType={true}
              minCharacters={1}
              cbOnChange={cbOnChange}
            />
          </SearchBoxWrap>

          <ResultsWrap ownerState={ownerState}>
            <ResultsInnerWrap ownerState={ownerState}>
              <ItemsGrid ownerState={ownerState} sx={{ display: showResults ? 'block' : 'none' }}>
                {!!algoliaSettings?.indexName ? (
                  <>
                    <Hits
                      ownerState={ownerState}
                      HitComponent={Card}
                      layoutConfig={layoutConfig}
                      gridLayout={variant}
                    />
                  </>
                ) : null}
              </ItemsGrid>
            </ResultsInnerWrap>
          </ResultsWrap>
        </AlgoliaSearch>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'AutoComplete',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: any }>``;

const AutoCompleteBackground = styled(Background, {
  name: 'AutoComplete',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ItemsGrid = styled(Box, {
  name: 'AutoComplete',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid, styles.itemsContainerOnePerRow]
})<{ ownerState: any }>(({ ownerState }) => ({
  // maxHeight: '50vh',
  // overflow: 'auto',
  // position: 'absolute',
  // zIndex: 200,
  // top: 'var(--grid-gap)',
  // right: 0,
  // width: '200%'
}));

const ResultsWrap = styled(Box, {
  name: 'AutoComplete',
  slot: 'ResultsWrap',
  overridesResolver: (_, styles) => [styles.resultsWrap]
})<{ ownerState: any }>(({ ownerState, theme }) => ({
  position: 'absolute', // Position it below the text box
  top: '100%', // Ensure it appears right below the text box
  right: 0, // Align it to the right of the text box
  width: '100%', // Set the width to 100% to match the parent
  maxHeight: '300px', // Set the max height to 300px
  overflowY: 'auto', // Add scroll if content exceeds max height
  backgroundColor: ownerState.backgroundColor,
  borderBottomRightRadius: 'var(--grid-gap-double)',
  borderBottomLeftRadius: 'var(--grid-gap-double)'
}));

const ResultsInnerWrap = styled(Box, {
  name: 'AutoComplete',
  slot: 'ResultsInnerWrap',
  overridesResolver: (_, styles) => [styles.resultsInnerWrap]
})<{ ownerState: any }>(({ ownerState }) => ({
  // position: 'relative'
}));

const SearchBoxWrap = styled(Box, {
  name: 'AutoComplete',
  slot: 'SearchBoxWrap',
  overridesResolver: (_, styles) => [styles.searchBoxWrap]
})<{ ownerState: any }>(({ ownerState, theme }) => ({
  ...theme.mixins.applyBackgroundColor({ ownerState: { backgroundColor: 'white' }, theme }),
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.spacing(10),

  input: { ...theme.typography.body1, padding: theme.spacing(1.5, 3) },

  svg: {
    position: 'absolute',
    width: theme.spacing(2),
    height: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

export default AutoComplete;
