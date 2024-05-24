import { cardBaseMock } from '../Card/Card.mock';
import { CardVariants } from '../Card';
import { introTextMock } from '../Text/Text.mock';

import { randomId } from '../utils/randomId';

import { type LinkWheelProps, LinkWheelVariants } from './LinkWheel.types';

export const linkwheelBaseMock = (override?: Partial<LinkWheelProps>): LinkWheelProps => {
  const baseMock: LinkWheelProps = {
    id: randomId(),
    __typename: 'LinkWheel',
    variant: LinkWheelVariants.threePerRow,
    // backgroundColor: 'black',
    items: [
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant }),
      cardBaseMock({ variant: override?.itemsVariant })
    ],
    itemsVariant: CardVariants.default,
    introText: introTextMock({
      title: `This is the LinkWheel ${override?.variant}-${override?.itemsVariant} title`
    })
  };

  let variantOverride;
  switch (override?.variant) {
    default:
      variantOverride = {};
  }

  return { ...baseMock, ...variantOverride, ...override } as LinkWheelProps;
};

export default linkwheelBaseMock;
