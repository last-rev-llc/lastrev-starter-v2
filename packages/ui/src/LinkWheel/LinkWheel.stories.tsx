import React from 'react';

import Box from '@mui/material/Box';

import LinkWheel from './LinkWheel';
import Grid from '../Grid';

import { linkwheelBaseMock } from './LinkWheel.mock';
import { LinkWheelVariants } from './LinkWheel.types';
import { CardVariants } from '../Card/Card.types';

import { theme } from '../ThemeRegistry/theme';

export default {
  title: 'Components/LinkWheel',
  component: LinkWheel,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      table: {
        disable: true
      }
    }
  }
};

const LinkWheelTemplate = {
  render: ({
    variant,
    itemsVariant: argItemsVariant,
    ...args
  }: {
    variant: LinkWheelVariants;
    itemsVariant: CardVariants;
  }) => {
    if (argItemsVariant) {
      return <LinkWheel {...linkwheelBaseMock({ variant, itemsVariant: argItemsVariant })} />;
    }
    const itemsVariants = Object.values(CardVariants).filter((v) => isNaN(Number(v)));
    return (
      <div>
        {itemsVariants?.map((itemsVariant: CardVariants) => (
          <>
            <Box
              key={itemsVariant}
              sx={{
                position: 'sticky',
                top: 0,
                backgroundColor: theme.vars.palette.primary.main,
                color: theme.vars.palette.primary.contrastText,
                ...theme.typography.display6,
                zIndex: 500,
                p: 1
              }}>
              LinkWheel &quot;{itemsVariant}&quot; Items Variant
            </Box>
            <Grid>
              <LinkWheel
                key={`${variant}_${itemsVariant}`}
                {...linkwheelBaseMock({ variant, itemsVariant })}
              />
            </Grid>
          </>
        ))}
      </div>
    );
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  ...LinkWheelTemplate,
  args: {
    variant: LinkWheelVariants.default
  }
};

export const OnePerRow = {
  ...LinkWheelTemplate,
  args: { variant: LinkWheelVariants.onePerRow }
};
export const TwoPerRow = {
  ...LinkWheelTemplate,
  args: { variant: LinkWheelVariants.twoPerRow }
};
export const ThreePerRow = {
  ...LinkWheelTemplate,
  args: { variant: LinkWheelVariants.threePerRow }
};
export const FourPerRow = {
  ...LinkWheelTemplate,
  args: { variant: LinkWheelVariants.fourPerRow }
};
export const FivePerRow = {
  ...LinkWheelTemplate,
  args: { variant: LinkWheelVariants.fivePerRow }
};
