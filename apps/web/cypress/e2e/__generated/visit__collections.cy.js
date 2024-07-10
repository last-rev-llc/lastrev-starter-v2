// This is a generated file from the list of pages in fixtures/generated_pages.json

describe(`Visit `, () => {
    it(`/collections renders correctly`, () => {
      cy.visit("/collections");

      // Percy
      cy.percySnapshot();
    });
  });
