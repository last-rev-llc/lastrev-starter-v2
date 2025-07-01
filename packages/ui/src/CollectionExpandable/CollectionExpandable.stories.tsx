import type { Meta, StoryObj } from '@storybook/react';

import CollectionExpandable from './CollectionExpandable';
import { CollectionExpandableVariants } from './CollectionExpandable.types';

import {
  collectionExpandableBaseMock,
  collectionExpandableDocumentManagerMock,
  collectionExpandableFAQMock
} from './CollectionExpandable.mock';

const meta: Meta<typeof CollectionExpandable> = {
  title: 'Components/CollectionExpandable',
  component: CollectionExpandable,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(CollectionExpandableVariants)
    },
    autoPlay: {
      control: 'boolean'
    },
    autoPlayInterval: {
      control: { type: 'range', min: 1000, max: 10000, step: 500 }
    },
    showProgressIndicator: {
      control: 'boolean'
    },
    expandMultiple: {
      control: 'boolean'
    },
    defaultExpanded: {
      control: { type: 'number', min: 0 }
    },
    fadeTransition: {
      control: 'boolean'
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<typeof CollectionExpandable>;

export const Default: Story = {
  args: {
    ...collectionExpandableBaseMock
  }
};

export const DocumentManager: Story = {
  args: {
    ...collectionExpandableDocumentManagerMock
  }
};

export const DocumentManagerNoAutoplay: Story = {
  args: {
    ...collectionExpandableDocumentManagerMock,
    autoPlay: false
  }
};

export const FAQ: Story = {
  args: {
    ...collectionExpandableFAQMock
  }
};

export const Timeline: Story = {
  args: {
    ...collectionExpandableBaseMock,
    variant: CollectionExpandableVariants.timeline,
    autoPlay: true,
    autoPlayInterval: 3000
  }
};

export const WithSharedImage: Story = {
  args: {
    ...collectionExpandableBaseMock,
    variant: CollectionExpandableVariants.documentManager,
    backgroundImage: {
      __typename: 'Media',
      id: 'shared-image',
      file: {
        url: 'https://picsum.photos/800/600?random=shared'
      },
      title: 'Shared Collection Image'
    }
  }
};

export const FastAutoplay: Story = {
  args: {
    ...collectionExpandableDocumentManagerMock,
    autoPlayInterval: 2000,
    showProgressIndicator: true
  }
};