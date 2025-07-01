import * as React from 'react';
import { mount } from '@cypress/react';
import NavigationItem from './NavigationItem';
import { type NavigationItemProps, NavigationLinkVariants } from './NavigationItem.types';
import {
  navigationItemBaseMock,
  navigationItemWithChildrenMock,
  navigationItemWithChildrenNestedMock
} from './NavigationItem.mock';

let mockedContent: NavigationItemProps;

beforeEach(() => {
  mockedContent = navigationItemBaseMock();
});

describe('NavigationItem', () => {
  context('renders correctly', () => {
    it('renders a basic navigation item', () => {
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a')
        .should('have.length', 1)
        .and('have.attr', 'href', `/${mockedContent.href}`)
        .and('have.text', mockedContent.text);
    });

    it('renders a navigation item with children', () => {
      mockedContent = navigationItemWithChildrenMock();
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a').should('have.length', (mockedContent.subNavigation?.length || 0) + 1);
      cy.get('a').first().should('have.text', mockedContent.text);
      cy.get('ul').should('exist');
      cy.get('ul li').should('have.length', mockedContent.subNavigation?.length);
    });

    it('renders a navigation item with nested children', () => {
      mockedContent = navigationItemWithChildrenNestedMock();
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('exist');
      cy.get('a').first().should('have.text', mockedContent.text);
      cy.get('ul').should('exist');
      cy.get('ul > li > ul').should('exist');
    });
  });

  context('functions correctly', () => {
    it('expands subnavigation on mobile when clicked', () => {
      mockedContent = navigationItemWithChildrenMock();
      cy.viewport('iphone-6');
      mount(<NavigationItem {...mockedContent} />);
      cy.get('ul').should('not.be.visible');
      cy.get('a').first().click();
      cy.get('ul').should('be.visible');
    });

    it('does not expand subnavigation on desktop when clicked', () => {
      mockedContent = navigationItemWithChildrenMock();
      mount(<NavigationItem {...mockedContent} />);
      cy.get('ul').should('be.visible');
      cy.get('a').first().click();
      cy.get('ul').should('be.visible');
    });

    it('calls onRequestClose when a subnavigation item is clicked', () => {
      const onRequestCloseSpy = cy.spy().as('onRequestCloseSpy');
      mockedContent = navigationItemWithChildrenMock();
      mockedContent.onRequestClose = onRequestCloseSpy;
      mount(<NavigationItem {...mockedContent} />);
      cy.get('ul li a').first().click();
      cy.get('@onRequestCloseSpy').should('have.been.called');
    });
  });

  context('applies correct styling', () => {
    it('applies the correct classes based on the variant', () => {
      mockedContent.variant = NavigationLinkVariants.linkBolded;
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should('have.class', 'MuiNavigationItem-linkBolded');
    });

    it('applies sidekick attributes when provided', () => {
      mockedContent.sidekickLookup = { contentTypeId: 'navigationItem' };
      mount(<NavigationItem {...mockedContent} />);
      cy.get('[data-testid=NavigationItem]').should(
        'have.attr',
        'data-csm-content-type-id',
        'navigationItem'
      );
    });
  });
});
