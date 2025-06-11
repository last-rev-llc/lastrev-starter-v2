import React from 'react';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid as SwiperGrid } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/cms-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CarouselProps, CarouselOwnerState } from './Carousel.types';
import Background from '../Background';

import { layoutConfig } from './Carousel.theme';

import { breakpoints } from '../ThemeRegistry/theme';

const getSlidesPerView = (
  numItems: number,
  itemsPerRow: number,
  maximum: number,
  teaserSize: number = 0.5
) => {
  if (numItems <= itemsPerRow) {
    if (numItems > maximum) {
      return maximum + teaserSize;
    }

    return itemsPerRow;
  }

  if (numItems > itemsPerRow) {
    if (numItems > maximum) {
      return maximum + teaserSize;
    }
    return itemsPerRow + teaserSize;
  }

  if (numItems > maximum) {
    return maximum + teaserSize;
  }
};

const Carousel = (props: CarouselProps) => {
  const ownerState: CarouselOwnerState = { ...props };
  const [jsEnabled, setJsEnabled] = React.useState<boolean>(false);

  const refSwiperWrap = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setJsEnabled(true);
  }, []);

  const {
    backgroundImage,
    backgroundColor,
    isCarouselDesktop,
    isCarouselTablet,
    isCarouselMobile,
    items,
    variant,
    itemsVariant,
    itemsAspectRatio,
    sidekickLookup,
    introText,
    itemsPerRow = 3,
    showFullItemsInCarousel,
    id,
    numItems = props?.items?.length ?? 3
  } = props;

  const swiperBreakpoints: { [width: number]: SwiperOptions } = {
    '1': {
      grid: {
        rows: isCarouselMobile ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: getSlidesPerView(
        numItems,
        itemsPerRow,
        1,
        !!showFullItemsInCarousel ? 0 : 0.25
      )
    },
    [breakpoints.sm]: {
      grid: {
        rows: isCarouselTablet ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: isCarouselTablet
        ? getSlidesPerView(numItems, itemsPerRow, 2, !!showFullItemsInCarousel ? 0 : 0.5)
        : 2
    },
    [breakpoints.md]: {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: isCarouselDesktop
        ? getSlidesPerView(numItems, itemsPerRow, 2, !!showFullItemsInCarousel ? 0 : 0.5)
        : 2
    },
    [breakpoints.lg]: {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: isCarouselDesktop
        ? getSlidesPerView(numItems, itemsPerRow, 3, !!showFullItemsInCarousel ? 0 : 0.5)
        : 3
    }
  };

  if (itemsPerRow >= 4) {
    swiperBreakpoints[breakpoints.md] = {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: isCarouselDesktop
        ? getSlidesPerView(numItems, itemsPerRow, 2, !!showFullItemsInCarousel ? 0 : 0.5)
        : 2
    };

    swiperBreakpoints[breakpoints.lg] = {
      grid: {
        rows: isCarouselDesktop ? 1 : 3,
        fill: 'row'
      },
      slidesPerView: isCarouselDesktop
        ? getSlidesPerView(numItems, itemsPerRow, 4, !!showFullItemsInCarousel ? 0 : 0.5)
        : 4
    };
  } else if (itemsPerRow >= 5) {
    swiperBreakpoints[breakpoints.xl] = {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: isCarouselDesktop
        ? getSlidesPerView(numItems, itemsPerRow, 5, !!showFullItemsInCarousel ? 0 : 0.5)
        : itemsPerRow
    };
  }

  return (
    <ErrorBoundary>
      <Root
        ownerState={ownerState}
        {...sidekick(sidekickLookup)}
        data-testid={`Carousel-${variant}`}>
        <CarouselBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Carousel-background"
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
          <SwiperWrap
            ownerState={ownerState}
            ref={refSwiperWrap}
            className={jsEnabled ? '' : 'no-js'}>
            <SwiperInnerWrap ownerState={ownerState}>
              {!!items?.length ? (
                <Swiper
                  rewind={true}
                  breakpointsBase="container"
                  cssMode={true}
                  roundLengths={true}
                  className="swiper-horizontal swiper-css-mode"
                  modules={[Navigation, Pagination, SwiperGrid, A11y]}
                  breakpoints={swiperBreakpoints}
                  navigation
                  key={`swiper-${id}`}>
                  {items?.map((item: any, index) => (
                    <SwiperSlide key={`swiper-slide-${id}-${item?.id ?? item?.title}-${index}`}>
                      <Item
                        backgroundColor={backgroundColor}
                        ownerState={ownerState}
                        {...item}
                        layoutConfig={layoutConfig}
                        gridLayout={variant}
                        variant={itemsVariant ?? item?.variant}
                        aspectRatio={itemsAspectRatio ?? item?.aspectRatio}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </SwiperInnerWrap>
          </SwiperWrap>
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Carousel',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CarouselOwnerState }>``;

const CarouselBackground = styled(Background, {
  name: 'Carousel',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'Carousel',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CarouselOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Carousel',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CarouselOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Carousel',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CarouselOwnerState }>``;

const SwiperWrap = styled(Box, {
  name: 'Carousel',
  slot: 'SwiperWrap',
  overridesResolver: (props, styles) => [styles.swiperWrap]
})<{ ownerState: CarouselOwnerState }>``;

const SwiperInnerWrap = styled(Box, {
  name: 'Carousel',
  slot: 'SwiperInnerWrap',
  overridesResolver: (_, styles) => [styles.swiperInnerWrap]
})<{ ownerState: CarouselOwnerState }>``;

const Item = styled(ContentModule, {
  name: 'Carousel',
  slot: 'Item',
  overridesResolver: (_: any, styles: { item: any }) => [styles.item]
})<{ ownerState: CarouselOwnerState }>``;

export default Carousel;
