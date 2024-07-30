import React from 'react';

import { styled } from '@mui/material/styles';

import Box, { type BoxProps } from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';
import { BubbleChat } from 'aai-embed-react';

import Grid from '../Grid';
import Background from '../Background';
import ContentModule from '../ContentModule';
import ErrorBoundary from '../ErrorBoundary';

import type { ChatProps, ChatOwnerState } from './Chat.types';

const Chat = (props: ChatProps) => {
  const ownerState = { ...props };

  const { backgroundImage, backgroundColor, introText, sidekickLookup, settings = {} } = props;

  const { chatflowid, apiHost, other } = settings;

  if (!chatflowid || !apiHost) return null;
  return (
    <ErrorBoundary>
      <Root data-testid="Chat" {...sidekick(sidekickLookup)} ownerState={ownerState}>
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
            <BubbleChat chatflowid={chatflowid} apiHost={apiHost} {...other} />
          </MainContentWrap>
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Chat',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: ChatOwnerState }>``;

const ChatBackground = styled(Background, {
  name: 'Chat',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Chat',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: ChatOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Chat',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: ChatOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Chat',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: ChatOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'Chat',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: ChatOwnerState }>``;

export default Chat;
