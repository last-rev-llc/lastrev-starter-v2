import * as React from 'react';
import { mount } from '@cypress/react18';

import Quote from './Quote';

import { quoteBaseMock } from './Quote.mock';

// TODO: Write tests
describe('Quote', () => {
  it('renders a quote', () => {
    const mockContent = quoteBaseMock();
    mount(<Quote {...mockContent} />);
    cy.get('.MuiTypography-body1')
      .first()
      .should('exist')
      .and('have.text', `"${mockContent.quote}"`);

    //cy.percySnapshot();
  });
});
