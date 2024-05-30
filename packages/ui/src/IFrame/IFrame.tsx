import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';

import type { IFrameProps, IFrameOwnerState } from './IFrame.types';

const IFrame = (props: IFrameProps) => {
  const { src, width = '100%', height = '500px' } = props;

  return (
    <ErrorBoundary>
      <Root data-testid="IFrame">
        <iframe src={src} width={width} height={height} border="0" />
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'IFrame',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: IFrameOwnerState }>``;

export default IFrame;
