import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { default as MuiCardMedia } from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea, { type CardActionAreaProps } from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Link, { type LinkProps } from '../Link';
import ContentModule from '../ContentModule';
import Fade from '../Animations/Fade';

import { getFirstOfArray } from '../utils/getFirstOfArray';
import ErrorBoundary from '../ErrorBoundary';

import type { CardProps, CardOwnerState } from './Card.types';

const Card = (props: CardProps) => {
  const {
    backgroundColor,
    className,
    id,
    media,
    overline,
    title,
    subtitle,
    body,
    link,
    actions,
    variant,
    gridLayout,
    loading,
    layoutConfig,
    sidekickLookup,
    aspectRatio
  } = props;

  const ownerState = {
    ...props,
    variant,
    backgroundColor
  };

  const image = getFirstOfArray(media);

  return (
    <ErrorBoundary>
      <Root
        ownerState={ownerState}
        data-testid="Card"
        {...sidekick(sidekickLookup)}
        className={className}>
        <CardWrap ownerState={ownerState}>
          {!!link ? <CardActionArea component={CardLink} {...link} /> : null}

          {image || loading ? (
            // @ts-ignore: TODO

            <CardMedia ownerState={ownerState}>
              <Fade>
                {!loading ? (
                  <ContentModule
                    __typename="Media"
                    {...sidekick(sidekickLookup, 'media')}
                    {...image}
                    aspectRatio={aspectRatio}
                    columns={layoutConfig[gridLayout]}
                    data-testid="Card-media"
                  />
                ) : (
                  <Skeleton variant="rectangular" width={210} height={118} />
                )}
              </Fade>
            </CardMedia>
          ) : null}

          {!loading && (overline || title || subtitle || body) ? (
            // @ts-ignore: TODO
            <ContentWrap ownerState={ownerState}>
              {overline ? (
                <Overline
                  {...sidekick(sidekickLookup, 'overline')}
                  variant="overline"
                  data-testid="Card-overline"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {overline}
                </Overline>
              ) : null}

              {title ? (
                <Title
                  {...sidekick(sidekickLookup, 'title')}
                  component="p"
                  variant="h4"
                  data-testid="Card-title"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {title}
                </Title>
              ) : null}

              {subtitle ? (
                <Subtitle
                  {...sidekick(sidekickLookup, 'subtitle')}
                  component="div"
                  variant="h6"
                  data-testid="Card-subtitle"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {subtitle}
                </Subtitle>
              ) : null}

              {body ? (
                <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                  <Body
                    __typename="RichText"
                    body={body}
                    ownerState={ownerState}
                    data-testid="Card-body"
                  />
                </BodyWrap>
              ) : null}
            </ContentWrap>
          ) : null}

          {loading ? (
            <ContentWrap ownerState={ownerState} data-testid="Card-ContentSkeleton">
              <Overline ownerState={ownerState} variant="overline">
                <Skeleton variant="text" width="100%" />
              </Overline>

              <Title ownerState={ownerState} variant="h5">
                <Skeleton variant="text" width="100%" />
              </Title>

              <Subtitle ownerState={ownerState} variant="h6">
                <Skeleton variant="text" width="100%" />
              </Subtitle>

              <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                <Body ownerState={ownerState} variant="bodySmall">
                  <Skeleton variant="text" width="100%" />
                </Body>
              </BodyWrap>
            </ContentWrap>
          ) : null}

          {(actions?.length || loading) && (
            <ActionsWrap
              {...sidekick(sidekickLookup, 'actions')}
              data-testid="Card-actions"
              // @ts-ignore: TODO
              ownerState={ownerState}>
              {!loading ? (
                actions?.map((link: any, index: number) => (
                  <Action
                    key={`card-${id}-link-${link?.id || index}`}
                    {...(link as any)}
                    ownerState={ownerState}
                  />
                ))
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </ActionsWrap>
          )}
        </CardWrap>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Card',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CardOwnerState }>``;

const CardWrap = styled(MuiCard, {
  name: 'Card',
  slot: 'CardWrap',
  overridesResolver: (_, styles) => [styles.cardWrap]
})<{ ownerState: CardOwnerState }>``;

const CardLink = styled(Link, {
  name: 'Card',
  slot: 'CardLink',
  overridesResolver: (_, styles) => [styles.link]
})<CardActionAreaProps & LinkProps & { ownerState: CardOwnerState }>``;

const CardMedia = styled(MuiCardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  overridesResolver: (_, styles) => [styles.media]
})<{ ownerState: CardOwnerState }>``;

const ActionsWrap = styled(CardActions, {
  name: 'Card',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: CardOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Card',
  slot: 'CardAction',

  overridesResolver: (_, styles) => [styles.action]
})<LinkProps & { ownerState: CardOwnerState }>``;

const ContentWrap = styled(CardContent, {
  name: 'Card',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: CardOwnerState }>``;

const Overline = styled(Typography, {
  name: 'Card',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: CardOwnerState }>``;

const Title = styled(Typography, {
  name: 'Card',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<{ ownerState: CardOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Card',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<{ ownerState: CardOwnerState }>``;

const BodyWrap = styled(Box, {
  name: 'Card',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})<{ ownerState: CardOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Card',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: CardOwnerState }>``;

export default Card;
