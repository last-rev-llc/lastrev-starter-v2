//TODO: Fix ts issues
// @ts-nocheck
import * as React from 'react';

import Hero from './Hero';

import mockContent from './Hero.mock';
import { getFirstOfArray } from '../utils/getFirstOfArray';

import type { HeroProps } from './Hero.types';

let mockedContent: HeroProps = { __typename: 'Hero', id: 'hero', title: 'test', theme: {} };

beforeEach(() => {
  mockedContent = { ...mockContent() };
});

describe('Hero', () => {
  context('renders correctly', () => {
    it('renders a hero with correct content', () => {
      cy.mount(<Hero {...mockedContent} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-title]').should('exist').and('have.text', mockedContent.title);

      cy.get('[data-testid=Hero-subtitle]')
        .should('exist')
        .and('have.text', mockedContent.subtitle);
      cy.get('[data-testid=Text-body1]')
        .should('exist')
        .and('have.text', mockedContent.body?.json.content.map((c) => c.content[0].value).join(''));

      cy.get('[class*="Hero-background-"]').should('exist');
      cy.get('.Hero-media')
        .should('exist')
        .and('have.attr', 'src', mockedContent.images[0].file.url);

      cy.contains(mockedContent.actions?.[0]?.text).should('exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no title', () => {
      cy.mount(<Hero {...mockedContent} title={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-title]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no subtitle', () => {
      cy.mount(<Hero {...mockedContent} subtitle={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-subtitle]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no body', () => {
      cy.mount(<Hero {...mockedContent} body={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-body]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no background image', () => {
      cy.mount(<Hero {...mockedContent} background={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-background]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no image', () => {
      cy.mount(<Hero {...mockedContent} image={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.get('[data-testid=Hero-image]').should('not.exist');
      //cy.percySnapshot();
    });

    it('renders a hero with no cta button', () => {
      cy.mount(<Hero {...mockedContent} actions={undefined} />);
      cy.get('[data-testid=Hero]').should('exist');
      cy.contains(mockedContent.actions?.[0]?.text).should('not.exist');
      //cy.percySnapshot();
    });
  });
});
