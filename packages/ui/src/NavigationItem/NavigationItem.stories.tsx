import React from 'react';
import Box from '@mui/material/Box';
import NavigationItem from './NavigationItem';
import { navigationItemBaseMock, navigationItemWithChildrenMock } from './NavigationItem.mock';

export default {
  title: 'Navigation/NavigationItem',
  component: NavigationItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'default',
          'link',
          'linkBolded',
          'group',
          'label',
          'localeList',
          'buttonOutlined',
          'button-container',
          'featured'
        ]
      }
    }
  }
};

export const Default = {
  args: {
    ...navigationItemBaseMock()
  }
};

export const WithChildren = {
  args: {
    ...navigationItemWithChildrenMock()
  }
};
