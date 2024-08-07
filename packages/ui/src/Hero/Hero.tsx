import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import Background from '../Background';
import Fade from '../Animations/Fade';
import Breadcrumbs from '../Breadcrumbs';

import { layoutConfig } from './Hero.theme';

import type { HeroProps, HeroOwnerState } from './Hero.types';

const Hero = (props: HeroProps) => {
  const ownerState = { ...props };

  const heroRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (heroRef.current) {
      window.scrollTo({
        top: heroRef.current.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const {
    breadcrumbs,
    variant,
    background,
    backgroundColor,
    overline,
    title,
    subtitle,
    body,
    actions,
    images,
    sidekickLookup,
    hideBreadcrumbs,
    isHomepage
  } = props;

  return (
    <Root data-testid="Hero" ownerState={ownerState} {...sidekick(sidekickLookup)} ref={heroRef}>
      <HeroBackground
        background={background ? ({ ...background, priority: true } as any) : undefined}
        backgroundColor={backgroundColor}
        testId="Hero-background"
      />
      <ContentOuterGrid ownerState={ownerState}>
        {overline || title || subtitle || body || actions ? (
          <MainContentWrap ownerState={ownerState}>
            <Content ownerState={ownerState}>
              {!hideBreadcrumbs && !!breadcrumbs?.length ? (
                <BreadcrumbsWrap ownerState={ownerState}>
                  <Breadcrumbs links={breadcrumbs} />
                </BreadcrumbsWrap>
              ) : null}

              <ContentInnerWrap ownerState={ownerState}>
                {!!overline && (
                  <Overline ownerState={ownerState} variant="overline">
                    {overline}
                  </Overline>
                )}

                {!!title && (
                  <Title
                    {...sidekick(sidekickLookup, 'title')}
                    component="h1"
                    variant="h1"
                    data-testid="Hero-title"
                    ownerState={ownerState}>
                    {title}
                  </Title>
                )}

                {!!subtitle && (
                  <Subtitle
                    {...sidekick(sidekickLookup, 'subtitle')}
                    data-testid="Hero-subtitle"
                    ownerState={ownerState}
                    component="p"
                    variant="h5">
                    {subtitle}
                  </Subtitle>
                )}

                {!!body && (
                  <Body
                    __typename="RichText"
                    ownerState={ownerState}
                    body={body}
                    {...sidekick(sidekickLookup, 'body')}
                  />
                )}
                {!!actions?.length && (
                  <ActionsWrap
                    {...sidekick(sidekickLookup, 'actions')}
                    data-testid="Hero-actions"
                    ownerState={ownerState}>
                    {actions.map((action) => (
                      <Action ownerState={ownerState} key={action?.id} {...action} />
                    ))}
                  </ActionsWrap>
                )}
              </ContentInnerWrap>
            </Content>
          </MainContentWrap>
        ) : null}

        {!!images?.length ? (
          <MediaWrap ownerState={ownerState}>
            {images?.map((image) => (
              <Fade key={image?.id}>
                <Media
                  ownerState={ownerState}
                  {...sidekick(sidekickLookup, 'images')}
                  {...image}
                  columns={layoutConfig[variant]}
                  data-testid="Hero-media"
                />
              </Fade>
            ))}
          </MediaWrap>
        ) : null}
      </ContentOuterGrid>

      {/* {!isHomepage && (
        <ScrollToContentWrap ownerState={ownerState}>
          <Typography variant="overline" onClick={scrollToBottom}>
            Scroll Down
          </Typography>
        </ScrollToContentWrap>
      )} */}
    </Root>
  );
};

const Root = styled(Box, {
  name: 'Hero',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: HeroOwnerState }>``;

const BreadcrumbsWrap = styled(Box, {
  name: 'Hero',
  slot: 'BreadcrumbsWrap',
  overridesResolver: (_, styles) => [styles.breadcrumbsWrap]
})<{ ownerState: HeroOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'Hero',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: HeroOwnerState }>``;

const MainContentWrap = styled('div', {
  name: 'Hero',
  slot: 'MainContentWrap',
  overridesResolver: (_, styles) => [styles.mainContentWrap]
})<{ ownerState: HeroOwnerState }>``;

const Content = styled(Box, {
  name: 'Hero',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})<{ ownerState: HeroOwnerState }>``;

const ContentInnerWrap = styled(Box, {
  name: 'Hero',
  slot: 'ContentInnerWrap',
  overridesResolver: (_, styles) => [styles.contentInnerWrap]
})<{ ownerState: HeroOwnerState }>``;

const HeroBackground = styled(Background, {
  name: 'Hero',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const Overline = styled(Typography, {
  name: 'Hero',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: HeroOwnerState }>``;

const Title = styled(Typography, {
  name: 'Hero',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: HeroOwnerState }>``;

const Subtitle = styled(Typography, {
  name: 'Hero',
  slot: 'Subtitle',
  overridesResolver: (_, styles) => [styles.subtitle]
})<TypographyProps & { ownerState: HeroOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'Hero',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: HeroOwnerState }>``;

const Media = styled(ContentModule, {
  name: 'Hero',
  slot: 'Media ',
  overridesResolver: (_, styles) => [styles.media]
})<{ ownerState: HeroOwnerState }>``;

const MediaWrap = styled(Box, {
  name: 'Hero',
  slot: 'MediaWrap ',
  overridesResolver: (_, styles) => [styles.mediaWrap]
})<{ ownerState: HeroOwnerState }>``;

const ActionsWrap = styled(Box, {
  name: 'Hero',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: HeroOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Hero',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: HeroOwnerState }>``;

const ScrollToContentWrap = styled(Grid, {
  name: 'Hero',
  slot: 'ScrollToContentWrap',
  overridesResolver: (_, styles) => [styles.scrollToContentWrap]
})<{ ownerState: HeroOwnerState }>``;

export default Hero;
