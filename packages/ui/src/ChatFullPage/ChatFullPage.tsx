import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { type BoxProps } from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';
import { FullPageChat } from 'aai-embed-react';

import Grid from '../Grid';
import Background from '../Background';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

import type { ChatFullPageProps, ChatFullPageOwnerState } from './ChatFullPage.types';

const ChatFullPage = (props: ChatFullPageProps) => {
  const ownerState = { ...props };

  const {
    backgroundImage,
    backgroundColor,
    introText,
    sidekickLookup,
    settings: { chatflowid, apiHost, other }
  } = props;

  if (!chatflowid || !apiHost) return null;
  return (
    <ErrorBoundary>
      <Root data-testid="ChatFullPage" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        <ChatBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Chat-background"
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
            <FullPageChat isFullPage={false} chatflowid={chatflowid} apiHost={apiHost} {...other} />
          </MainContentWrap>
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'ChatFullPage',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: ChatFullPageOwnerState }>``;

const ChatBackground = styled(Background, {
  name: 'ChatFullPage',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'ChatFullPage',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: ChatFullPageOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'ChatFullPage',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: ChatFullPageOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'ChatFullPage',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: ChatFullPageOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'ChatFullPage',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: ChatFullPageOwnerState }>``;

export default ChatFullPage;
