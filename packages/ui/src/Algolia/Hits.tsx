'use client';
import React, { useEffect, useState } from 'react';

import { useHits } from 'react-instantsearch-core';
import { CardProps } from '../Card/Card.types';

// https://www.algolia.com/doc/api-reference/widgets/hits/react/#hook
const Hits = ({
  ownerState,
  HitComponent,
  layoutConfig,
  gridLayout,
  ...other
}: {
  layoutConfig: any;
  gridLayout: any;
  ownerState: any;
  HitComponent: any;
}) => {
  const { items } = useHits(other);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Skip rendering on server-side

  return (
    <>
      {items.map((hit, index) => {
        const cardData: CardProps = { ...(hit.card ?? hit), __typename: 'Card' };
        // !!hit?.categories?.length && (cardData.overline = hit.categories[0]);
        // cardData.actions?.forEach((cta) => {
        //   if (cta) {
        //     cta.color = 'navyBlue';
        //     cta.variant = 'buttonContained';
        //   }
        // });

        return (
          <HitComponent
            key={`hit-${index}-${hit.id}`}
            layoutConfig={layoutConfig}
            gridLayout={gridLayout}
            {...cardData}
            variant={ownerState.itemsVariant}
            aspectRatio={ownerState.itemsAspectRatio}
            backgroundColor={ownerState.backgroundColor}
            ownerState={ownerState}
            highlightOverline
          />
        );
      })}
    </>
  );
};

export default Hits;
