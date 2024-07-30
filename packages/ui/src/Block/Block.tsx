import React from 'react';
import { useTransform, motion, useInView } from 'framer-motion';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import Slide from '../Animations/Slide';
import Background from '../Background';
import ErrorBoundary from '../ErrorBoundary';

import type { BlockProps, BlockOwnerState } from './Block.types';
import { layoutConfig } from './Block.theme';

const Block = (props: BlockProps) => {
  const ownerState = { ...props };

  const ref = React.useRef<HTMLDivElement>(null);

  // Use useInView with the ref
  const isInView = useInView(ref, { once: false });

  // Define the animation properties
  const animation = {
    x: isInView ? 0 : '100%', // Animate when inView is true, otherwise off-screen to the right
    transition: { duration: 0.5, ease: 'easeInOut' } // You can adjust duration and easing
  };

  const {
    backgroundImage,
    backgroundColor,
    introText,
    variant,
    overline,
    title,
    subtitle,
    body,
    supplementalContent,
    mediaItems,
    actions,
    sidekickLookup
  } = props;

  return (
    <ErrorBoundary>
      <Root
        data-testid="Block"
        {...sidekick(sidekickLookup)}
        ownerState={ownerState}
        data-variant={props.variant}>
        <BlockBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Block-background"
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
          {overline || title || subtitle || body || actions ? (
            <MainContentWrap ownerState={ownerState}>
              <Content ownerState={ownerState}>
                {!!overline && (
                  <Overline ownerState={ownerState} variant="overline">
                    {overline}
                  </Overline>
                )}

                {!!title && (
                  <Title
                    ownerState={ownerState}
                    {...sidekick(sidekickLookup, 'title')}
                    data-testid="Block-title"
                    variant="h3"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                )}

                {!!subtitle && (
                  <Subtitle
                    ownerState={ownerState}
                    {...sidekick(sidekickLookup, 'subtitle')}
                    data-testid="Block-subtitle"
                    variant="h5">
                    {subtitle}
                  </Subtitle>
                )}

                {!!body && (
                  <Body
                    variant="inline"
                    __typename="RichText"
                    ownerState={ownerState}
                    {...sidekick(sidekickLookup, 'body')}
                    body={body}
                  />
                )}
              </Content>

              {!!actions?.length && (
                <ActionsWrap
                  ownerState={ownerState}
                  {...sidekick(sidekickLookup, 'actions')}
                  data-testid="Block-actions">
                  {actions.map((action) => (
                    <Action
                      ownerState={ownerState}
                      key={action?.id}
                      {...action}
                      variant="buttonText"
                      iconPosition="Left"
                      icon="logo"
                    />
                  ))}
                </ActionsWrap>
              )}
            </MainContentWrap>
          ) : null}

          {(!!mediaItems?.length || supplementalContent) && (
            <SideContentWrap ownerState={ownerState}>
              {!!mediaItems?.length ? (
                mediaItems.map((media) => (
                  // <Slide key={media?.id}>
                    <Media
                      ownerState={ownerState}
                      {...sidekick(sidekickLookup, 'mediaItems')}
                      {...media}
                      columns={layoutConfig[variant]}
                    />
                  // </Slide>
                ))
              ) : (
                <ContentModule {...supplementalContent} />
              )}
            </SideContentWrap>
          )}
        </ContentOuterGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Block',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: BlockOwnerState }>``;

const BlockBackground = styled(Background, {
  name: 'Block',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Block',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: BlockOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Block',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: BlockOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Block',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: BlockOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'Block',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: BlockOwnerState }>``;

const Content = styled(Box, {
  name: 'Block',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<{ ownerState: BlockOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Block',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: BlockOwnerState }>``;

const Title = styled(Typography, {
  name: 'Block',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<{ ownerState: BlockOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Block',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<{ ownerState: BlockOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Block',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: BlockOwnerState }>``;

const SideContentWrap = styled('div', {
  name: 'Block',
  slot: 'SideContentWrap',
  overridesResolver: (_, styles) => [styles.sideContentWrap]
})<{ ownerState: BlockOwnerState }>``;

const Media = styled(ContentModule, {
  name: 'Block',
  slot: 'Media',
  overridesResolver: (_, styles) => [styles.media]
})<{ ownerState: BlockOwnerState }>``;

const ActionsWrap = styled(Box, {
  name: 'Block',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: BlockOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Block',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: BlockOwnerState }>``;

export default Block;
