import React from 'react';

import { styled } from '@mui/material/styles';

import sidekick from '@last-rev/contentful-sidekick-util';

import Box from '@mui/material/Box';

import ContentModule from '../ContentModule';
import Grid from '../Grid';
import TableOfContents from '../TableOfContents';

import type { FRDProps } from './FRD.types';
import { LinkProps } from '../Link';

const FRD = (props: FRDProps) => {
  const { header, hero, contents, footer, sidekickLookup, sideNav } = props;

  const ownerState = {
    ...props
  };

  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}

      {hero ? <ContentModule {...(hero as any)} /> : null}

      <Main {...sidekick(sidekickLookup, 'contents')}>
        <ContentOuterGrid ownerState={ownerState}>
          <SideNavWrap>
            {!!sideNav?.length && (
              <TableOfContents
                items={sideNav.filter((item): item is LinkProps => item !== undefined)}
              />
            )}
          </SideNavWrap>
          <ContentWrap>
            {contents?.map((content: any) => (
              <ContentModule key={content?.id} {...content} component="section" />
            ))}
          </ContentWrap>
        </ContentOuterGrid>
      </Main>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled('main', {
  name: 'FRD',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})``;

const ContentOuterGrid = styled(Grid, {
  name: 'Block',
  slot: 'ContentOuterGrid',
  overridesResolver: (_, styles) => [styles.contentOuterGrid]
})<{}>``;

const SideNavWrap = styled(Box, {
  name: 'FRD',
  slot: 'SideNavWrap',
  overridesResolver: (_, styles) => [styles.sideNavWrap]
})<{}>``;

const ContentWrap = styled(Box, {
  name: 'FRD',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{}>``;

export default FRD;
