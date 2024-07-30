import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

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
  const ownerState = {
    ...props,
    ...props.ownerState,
    variant,
    itemsVariant
  };

  const cbOnChange = (isValid: boolean) => {
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
              minCharacters={3}
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
  name: 'CollectionDynamic',
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
  // backgroundColor: ownerState.backgroundColor
}));

const ResultsInnerWrap = styled(Box, {
  name: 'AutoComplete',
  slot: 'ResultsInnerWrap',
  overridesResolver: (_, styles) => [styles.resultsInnerWrap]
})<{ ownerState: any }>(({ ownerState }) => ({
  // position: 'relative'
}));

const SearchBoxWrap = styled(Box, {
  name: 'CollectionDynamic',
  slot: 'SearchBoxWrap',
  overridesResolver: (_, styles) => [styles.searchBoxWrap]
})<{ ownerState: any }>(({ ownerState }) => ({}));

export default AutoComplete;
