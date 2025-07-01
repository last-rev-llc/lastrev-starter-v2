import React from 'react';
import { useAmp } from 'next/amp';

import { styled } from '@mui/material/styles';

import sidekick from '@last-rev/cms-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
import ArtDirectedImage from '../ArtDirectedImage';

import type { MediaOwnerState, MediaProps, MediaVideoProps } from './Media.types';
import Box from '@mui/material/Box';

const Wrapper = ({ children, aspectRatio }: { children: React.ReactNode; aspectRatio?: string }) =>
  aspectRatio ? (
    <AspectRatioRoot ownerState={{ aspectRatio }}> {children} </AspectRatioRoot>
  ) : (
    children
  );

const Media = (props: MediaProps & MediaVideoProps) => {
  const isAmp = useAmp();
  const ownerState = { ...props };

  const {
    variant,
    file,
    title,
    fileMobile,
    fileTablet,
    testId,
    sidekickLookup,
    imageOverlayColor,
    aspectRatio,
    ...other
  } = props;

  // TODO: Add support for video
  const image = file;
  const alt = title || '';

  if (variant === 'embed' && isAmp) {
    return (
      <ErrorBoundary>
        <Wrapper aspectRatio={aspectRatio}>
          {/* @ts-expect-error */}
          <amp-iframe
            {...sidekick(sidekickLookup)}
            src={image?.url}
            data-testid={testId || 'Media'}
            width={image?.width ?? 800}
            height={image?.height ?? 400}
            layout="responsive"
            sandbox="allow-scripts allow-same-origin"
          />
        </Wrapper>
      </ErrorBoundary>
    );
  }
  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <Wrapper aspectRatio={aspectRatio}>
          <EmbedWrap ownerState={ownerState}>
            <EmbedRoot
              {...sidekick(sidekickLookup)}
              {...(props as React.IframeHTMLAttributes<any>)}
              mozallowfullscreen={'mozallowfullscreen'}
              webkitallowfullscreen={'webkitallowfullscreen'}
              allowfullscreen={'allowfullscreen'}
              src={image?.url}
              sx={{ width: '100%', height: '100%', ...props.sx }}
              data-testid={testId || 'Media'}
            />
          </EmbedWrap>
        </Wrapper>
      </ErrorBoundary>
    );
  }

  if (variant === 'video') {
    return (
      <ErrorBoundary>
        <Wrapper aspectRatio={aspectRatio}>
          <VideoRoot
            {...sidekick(sidekickLookup)}
            preload="auto"
            data-testid={testId || 'Media'}
            {...(props as MediaVideoProps)}
            controls="true"
            sx={{ width: '100%', height: '100%', ...props.sx }}>
            <source src={file?.url} />
            Your browser does not support the video tag.
          </VideoRoot>
        </Wrapper>
      </ErrorBoundary>
    );
  }
  if (fileTablet || fileMobile) {
    return (
      <ErrorBoundary>
        <ArtDirectedRoot
          {...sidekick(sidekickLookup)}
          {...other}
          title={title}
          file={file}
          fileTablet={fileTablet}
          fileMobile={fileMobile}
          ownerState={ownerState}
          testId={testId || 'Media'}
        />
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        {...image}
        {...other}
        src={image?.url}
        alt={'alt'}
        ownerState={ownerState}
        columns={other?.columns}
        testId={testId || 'Media'}
      />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'fileName' &&
  prop !== 'testId' &&
  prop !== 'priority' &&
  prop !== 'sidekickLookup' &&
  prop !== 'sx' &&
  prop !== 'file' &&
  prop !== 'fileTablet' &&
  prop !== 'fileMobile' &&
  prop !== 'nextImageOptimization';

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop: string) =>
    prop !== 'variant' && prop !== 'fileName' && prop !== 'sidekickLookup',
  overridesResolver: (_: any, styles: { root: any }) => [styles.root]
})<{ variant?: string }>``;

const AspectRatioRoot = styled(Box, {
  name: 'Media',
  slot: 'AspectRatioRoot',
  overridesResolver: (_, styles) => [styles.aspectRatioRoot]
})<{ variant?: string; ownerState: MediaOwnerState }>``;

const ArtDirectedRoot = styled(ArtDirectedImage, {
  name: 'Media',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any }) => [styles.root]
})``;

const EmbedWrap = styled(Box, {
  name: 'Media',
  slot: 'EmbedWrap',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any }) => [styles.root]
})<{ ownerState: MediaOwnerState }>``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp,
  overridesResolver: (_: any, styles: { root: any }) => [styles.root]
})<{ variant?: string; ownerState: MediaOwnerState }>``;

export default Media;
