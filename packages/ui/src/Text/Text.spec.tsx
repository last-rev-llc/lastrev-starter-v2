import * as React from 'react';

import { BLOCKS } from '@contentful/rich-text-types';

import type { TextProps } from './Text.types';
import Text from './Text';

import {
  formattedMock,
  dynamicMock,
  valueNode,
  contentNode,
  embeddedEntryInlineNode,
  embeddedEntryBlockNode,
  embeddedAssetBlockNode,
  hyperlinkNode,
  withLinksMock
} from '../RichText/RichText.mock';

import mockContent from './Text.mock';

import { mediaBaseImageMock } from '../Media/Media.mock';
import linkButtonMock from '../Link/Link.mock';

const variantNodeTypeMapper = {
  [BLOCKS.PARAGRAPH]: 'body1',
  [BLOCKS.HEADING_1]: 'h1',
  [BLOCKS.HEADING_2]: 'h2',
  [BLOCKS.HEADING_3]: 'h3',
  [BLOCKS.HEADING_4]: 'h4',
  [BLOCKS.HEADING_5]: 'h5',
  [BLOCKS.HEADING_6]: 'h6'
};

const createTextMock = (nodeType: string): TextProps => ({
  __typename: 'Text',
  body: dynamicMock([contentNode([valueNode()], nodeType)])
});

const testNodeType = (variant: string, nodeType: string) => {
  it(`renders correct text in a ${variant} when nodeType is ${nodeType}`, () => {
    const testNode: TextProps = { ...createTextMock(nodeType) };
    cy.mount(<Text {...testNode} />);
    cy.get(`[data-testid=Text-${variant}]`).each((body, index) => {
      cy.wrap(body).should(
        'have.text',
        testNode.body?.json.content.filter((c: any) => c.nodeType === nodeType)[index].content[0]
          .value
      );
    });
  });
};

describe('Text', () => {
  context('renders correctly', () => {
    it.skip('renders text with correct information', () => {
      const mockedContent: TextProps = mockContent();
      cy.mount(<Text {...mockedContent} />);
      cy.get('[data-testid=Text-root]').should(
        'have.text',
        mockedContent.body?.json.content.map((c) => c.content[0].value).join('')
      );
      //cy.percySnapshot();
    });

    it('renders formatted text with correct information', () => {
      const mockedContent: TextProps = formattedMock();
      cy.mount(<Text {...mockedContent} />);

      //cy.percySnapshot();
    });

    describe('node types', () => {
      context('text node types', () => {
        Object.entries(variantNodeTypeMapper).forEach(([nodeType, variant]) => {
          testNodeType(variant, nodeType);
        });
      });

      context.skip('other node types', () => {
        it('renders text with embedded inline entry', () => {
          const mockedEntry = linkButtonMock();
          const mockedContent: TextProps = dynamicMock(
            [contentNode([embeddedEntryInlineNode(mockedEntry.id || '')])],
            [mockedEntry]
          );
          cy.mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-inline]')
            .contains(mockedEntry.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders text with embedded entry block', () => {
          const mockedEntry = linkButtonMock();
          const mockedContent: TextProps = dynamicMock(
            [embeddedEntryBlockNode(mockedEntry.id || '')],
            [mockedEntry]
          );
          cy.mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-entry-block]')
            .contains(mockedEntry.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders text with embedded asset block', () => {
          const mockedMedia = mediaBaseImageMock();
          const mockedContent: TextProps = dynamicMock(
            [embeddedAssetBlockNode(mockedMedia.id || '')],
            [],
            [mockedMedia]
          );
          cy.mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-embedded-asset-block]')
            .should('exist')
            .and('have.attr', 'src', mockedMedia.file?.url);
          //cy.percySnapshot();
        });

        it('renders text with hyperlink', () => {
          const mockedLink = linkButtonMock();
          const mockedContent: TextProps = dynamicMock(
            [hyperlinkNode(mockedLink.text || '', mockedLink.href as string)],
            [],
            [mockedLink]
          );
          cy.mount(<Text {...mockedContent} />);
          cy.get('[data-testid=Text-hyperlink]')
            .contains(mockedLink.text as string | number | RegExp)
            .should('exist');
          //cy.percySnapshot();
        });

        it('renders formatted text with hyperlink', () => {
          const mockedContent: TextProps = withLinksMock();
          cy.mount(<Text {...mockedContent} />);
          //cy.percySnapshot();
        });
      });
    });
  });
});
