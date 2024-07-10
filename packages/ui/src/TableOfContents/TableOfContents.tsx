import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from '../Link';
import ErrorBoundary from '../ErrorBoundary';

import type { TableOfContentsProps, TableOfContentsOwnerState } from './TableOfContents.types';
import ContentModule from '../ContentModule';

export const TableOfContents = (props: TableOfContentsProps) => {
  const ownerState = { ...props };
  const { items } = props;
  return (
    <ErrorBoundary>
      <Root data-testid="TableOfContents" ownerState={ownerState}>
        <NavLinksList ownerState={ownerState} component="ul" data-testid="TableOfContents-list">
          {items?.map((link, idx) => (
            <NavLinksListItem
              ownerState={ownerState}
              component="li"
              key={`${idx}-${link?.id}`}
              data-testid="TableOfContents-link">
              <NavLink
                ownerState={ownerState}
                __typename="Link"
                href={String(link?.href).substring(1)}>
                {link?.text}
              </NavLink>
            </NavLinksListItem>
          ))}
        </NavLinksList>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'TableOfContents',
  slot: 'Root'
})<{ ownerState: TableOfContentsOwnerState }>``;

const NavLinksList = styled(Box, {
  name: 'TableOfContents',
  slot: 'NavLinksList',
  overridesResolver: (_, styles) => [styles.navLinksList]
})<{ ownerState: TableOfContentsOwnerState }>``;

const NavLinksListItem = styled(Box, {
  name: 'TableOfContents',
  slot: 'NavLinksListItem',
  overridesResolver: (_, styles) => [styles.navLinksListItem]
})<{ ownerState: TableOfContentsOwnerState }>``;

const NavLink = styled(ContentModule, {
  name: 'TableOfContents',
  slot: 'NavLink',
  overridesResolver: (_, styles) => [styles.navLink]
})<{ ownerState: TableOfContentsOwnerState }>``;

export default TableOfContents;
