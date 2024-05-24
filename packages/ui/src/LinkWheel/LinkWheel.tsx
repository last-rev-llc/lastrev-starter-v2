'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import Background from '../Background';

import { type LinkWheelProps, type LinkWheelOwnerState } from './LinkWheel.types';

import { PieChart } from '@mui/x-charts/PieChart';
import { LinkProps } from '../Link/Link.types';

const LinkWheel = (props: LinkWheelProps) => {
  const router = useRouter();
  const ownerState = { ...props };

  const { backgroundImage, backgroundColor, items, sidekickLookup, introText } = props;

  const data = items
    ?.filter((item: LinkProps) => !!item?.text)
    .map((item, index) => {
      return { label: item?.text, value: 1 };
    });

  const series = [
    {
      arcLabel: (item: any) => {
        return item.label;
      },
      innerRadius: 100,
      outerRadius: 400,
      cx: 395,
      cy: 395,
      id: 'series-1',
      data,
      highlightScope: { faded: 'global', highlighted: 'item' }
    }
  ];

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`LinkWheel`}>
        <LinkWheelBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="LinkWheel-background"
        />
        {introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}

        <ContentGrid ownerState={ownerState}>
          <PieChartWrap>
            <PieChart
              series={series}
              width={800}
              height={800}
              tooltip={{ trigger: 'none' }}
              slotProps={{
                legend: { hidden: true }
              }}
              onItemClick={(event, d) => {
                const url = items?.[d.dataIndex]?.href;
                if (!url) return;

                router.push(url as string);
              }}
            />
          </PieChartWrap>
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'LinkWheel',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: LinkWheelOwnerState }>``;

const LinkWheelBackground = styled(Background, {
  name: 'LinkWheel',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'LinkWheel',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: LinkWheelOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'LinkWheel',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: LinkWheelOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'LinkWheel',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: LinkWheelOwnerState }>``;

const PieChartWrap = styled(Box, {
  name: 'LinkWheel',
  slot: 'PieChartWrap',
  overridesResolver: (_, styles) => [styles.pieChartWrap]
})<{ ownerState: LinkWheelOwnerState }>``;

export default LinkWheel;
