import { randomId } from '@repo/utils';

import type { CollectionExpandableProps } from './CollectionExpandable.types';
import { CollectionExpandableVariants } from './CollectionExpandable.types';

const baseMock: Partial<CollectionExpandableProps> = {
  id: randomId(),
  __typename: 'CollectionExpandable' as const,
  sidekickLookup: {},
  variant: CollectionExpandableVariants.default,
  backgroundColor: 'transparent',
  introText: {
    __typename: 'Text',
    id: randomId(),
    title: 'Expandable Collection',
    subtitle: 'Interactive content with auto-progression',
    body: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'This collection supports expandable items with automatic progression and smooth image transitions.'
          }
        ]
      }
    ]
  }
};

export const collectionExpandableBaseMock: CollectionExpandableProps = {
  ...baseMock,
  items: [
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'Minutes From Q4 Virtual Board Meeting',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'Meeting Date: 11.18.2020' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Attendees: 45' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Document Status: Approved' }
          ]
        }
      ],
      backgroundImage: {
        __typename: 'Media',
        id: randomId(),
        file: {
          url: 'https://picsum.photos/800/600?random=1'
        },
        title: 'Board Meeting Documents'
      }
    },
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'GC Advisory Board Meeting London, February 4, 2019',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'Meeting Date: 02.04.2019' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Attendees: 4' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Document Status: Draft' }
          ]
        }
      ],
      backgroundImage: {
        __typename: 'Media',
        id: randomId(),
        file: {
          url: 'https://picsum.photos/800/600?random=2'
        },
        title: 'Advisory Meeting'
      }
    },
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'Minutes for GC Advisory Board Meeting, January 29, 2019',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'Meeting Date: 01.29.2019' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Attendees: 4' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Document Status: Draft' }
          ]
        }
      ],
      backgroundImage: {
        __typename: 'Media',
        id: randomId(),
        file: {
          url: 'https://picsum.photos/800/600?random=3'
        },
        title: 'January Meeting'
      }
    },
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'Minutes for Diligent Product Training',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'Meeting Date: 07.29.2018' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Attendees: 37' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: 'Document Status: Draft' }
          ]
        }
      ],
      backgroundImage: {
        __typename: 'Media',
        id: randomId(),
        file: {
          url: 'https://picsum.photos/800/600?random=4'
        },
        title: 'Training Session'
      }
    }
  ]
};

export const collectionExpandableDocumentManagerMock: CollectionExpandableProps = {
  ...baseMock,
  variant: CollectionExpandableVariants.documentManager,
  autoPlay: true,
  autoPlayInterval: 4000,
  items: collectionExpandableBaseMock.items
};

export const collectionExpandableFAQMock: CollectionExpandableProps = {
  ...baseMock,
  variant: CollectionExpandableVariants.faq,
  expandMultiple: true,
  introText: {
    __typename: 'Text',
    id: randomId(),
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    body: []
  },
  items: [
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'How do I access the board portal?',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'You can access the board portal by logging in with your credentials at portal.company.com. If you need assistance, contact our support team.' }
          ]
        }
      ]
    },
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'What documents are available?',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'All board meeting minutes, financial reports, and strategic documents are available in the portal. Documents are organized by date and meeting type.' }
          ]
        }
      ]
    },
    {
      id: randomId(),
      __typename: 'CollectionExpandableItem',
      title: 'How do I download documents?',
      body: [
        {
          type: 'paragraph',
          children: [
            { text: 'Click on any document to view it, then use the download button in the top right corner. You can download individual files or entire meeting packages.' }
          ]
        }
      ]
    }
  ]
};

export default collectionExpandableBaseMock;