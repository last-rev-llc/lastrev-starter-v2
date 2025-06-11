/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/cms-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { TextProps, TextOwnerState } from './Text.types';
import Grid from '../Grid';
import Background from '../Background';
import Box from '@mui/material/Box';

const Text = (props: TextProps) => {
  const align = props?.align || 'inherit';
  const ownerState = { ...props, align };

  const { body, overline, title, subtitle, variant, sidekickLookup, sx } = props;

  return (
    <ErrorBoundary>
      <Root data-testid="Text-root" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {!!overline && (
          <Overline
            data-testid="Text-overline"
            {...sidekick(sidekickLookup, 'overline')}
            variant="overline"
            align={align}
            ownerState={ownerState}>
            {overline}
          </Overline>
        )}

        {!!title && (
          <Title
            data-testid="Text-title"
            align={align}
            {...sidekick(sidekickLookup, 'title')}
            variant="h1"
            ownerState={ownerState}>
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle
            data-testid="Text-subtitle"
            align={align}
            {...sidekick(sidekickLookup, 'subtitle')}
            ownerState={ownerState}
            variant="h2">
            {subtitle}
          </Subtitle>
        )}

        {!!body && (
          <BodyWrap ownerState={ownerState}>
            <ContentModule
              body={body}
              sidekickLookup={sidekickLookup}
              variant={variant}
              {...props}
              __typename="RichText"
              ownerState={ownerState}
            />
          </BodyWrap>
        )}
      </Root>
    </ErrorBoundary>
  );
};

// Support for \n in text
const Root = styled(Grid, {
  name: 'Text',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: TextOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Text',
  slot: 'Overline',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_: any, styles: { overline: any }) => [styles.overline]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Title = styled(Typography, {
  name: 'Text',
  slot: 'Title',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_: any, styles: { title: any }) => [styles.title]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Text',
  slot: 'Subtitle',
  shouldForwardProp: (prop: string) => prop !== 'ownerState',
  overridesResolver: (_: any, styles: { subtitle: any }) => [styles.subtitle]
})<TypographyProps & { ownerState: TextOwnerState }>``;

const BodyWrap = styled(Box, {
  name: 'Text',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})<TypographyProps & { ownerState: TextOwnerState }>``;

export default Text;
