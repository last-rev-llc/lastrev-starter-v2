import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography, { type TypographyProps } from '@mui/material/Typography';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ContentModule from '../ContentModule';

import type { PageDocumentProps, PageDocumentOwnerState } from './PageDocument.types';

const PageDocument = (props: PageDocumentProps) => {
  const ownerState = { ...props };

  const { id, externalUrl, header, footer, body, relatedItems, breadcrumbs, sidekickLookup, hero } =
    props;

  console.log({ externalUrl });
  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}

      <Main component="main" {...sidekick(sidekickLookup)} ownerState={ownerState}>
        {hero && <ContentModule {...(hero as any)} breadcrumbs={breadcrumbs} />}

        <ContentOuterGrid ownerState={ownerState}>
          <ContentWrap ownerState={ownerState}>
            {!!body && (
              <Body
                body={body}
                sidekickLookup={sidekickLookup}
                variant="inline"
                __typename="RichText"
                ownerState={ownerState}
              />
            )}

            {externalUrl && (
              <ContentModule __typename="IFrame" src={externalUrl} component="section" />
            )}
          </ContentWrap>
        </ContentOuterGrid>

        {!!relatedItems && <RelatedItems {...relatedItems} ownerState={ownerState} />}
      </Main>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled(Box, {
  name: 'PageDocument',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: PageDocumentOwnerState }>``;

const ContentOuterGrid = styled(Grid, {
  name: 'PageDocument',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{ ownerState: PageDocumentOwnerState }>``;

const Title = styled(Typography, {
  name: 'PageDocument',
  slot: 'Title',
  overridesResolver: (_, styles) => [styles.title]
})<TypographyProps & { ownerState: PageDocumentOwnerState }>``;

const PubDate = styled(Typography, {
  name: 'PageDocument',
  slot: 'PubDate',
  overridesResolver: (_, styles) => [styles.pubDate]
})<TypographyProps & { ownerState: PageDocumentOwnerState }>``;

const ContentWrap = styled(Box, {
  name: 'PageDocument',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: PageDocumentOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: PageDocumentOwnerState }>``;

const RelatedItems = styled(ContentModule, {
  name: 'PageDocument',
  slot: 'RelatedItems',
  overridesResolver: (_, styles) => [styles.relatedItems]
})<{ ownerState: PageDocumentOwnerState }>``;

export default PageDocument;
