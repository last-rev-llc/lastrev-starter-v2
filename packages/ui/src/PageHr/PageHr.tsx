import React from 'react';

import { styled } from '@mui/material/styles';

import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';

import type { PageHrProps } from './PageHr.types';

const PageHr = (props: PageHrProps) => {
  const { header, hero, contents, footer, sidekickLookup } = props;

  const ownerState = {
    ...props
  };

  return (
    <>
      {header ? <ContentModule {...(header as any)} /> : null}

      {hero ? <ContentModule {...(hero as any)} /> : null}

      <Main {...sidekick(sidekickLookup, 'contents')}>
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} component="section" />
        ))}
      </Main>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled('main', {
  name: 'PageHr',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})``;

export default PageHr;
