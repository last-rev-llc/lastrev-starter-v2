import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { type BoxProps } from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import Background from '../Background';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

import type { IFrameProps, IFrameOwnerState } from './IFrame.types';

const IFrame = (props: IFrameProps) => {
  const ownerState = { ...props };
  const { iFrameUrl, backgroundImage, backgroundColor, introText, sidekickLookup } = props;

  return (
    <ErrorBoundary>
      <Root data-testid="IFrame" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <IFrameBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="IFrame-background"
        />

        {!!introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}

        <ContentOuterGrid ownerState={ownerState}>
          <MainContentWrap ownerState={ownerState}>
            <IframeWrap ownerState={ownerState} src={iFrameUrl} />
          </MainContentWrap>
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'IFrame',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: IFrameOwnerState }>``;

const IFrameBackground = styled(Background, {
  name: 'IFrame',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'IFrame',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: IFrameOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'IFrame',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: IFrameOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'IFrame',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: IFrameOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'IFrame',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: IFrameOwnerState }>``;

const IframeWrap = styled('iframe', {
  name: 'IFrame',
  slot: 'IframeWrap',
  overridesResolver: (_, styles) => [styles.iframeWrap]
})<{ ownerState: IFrameOwnerState }>``;

export default IFrame;
