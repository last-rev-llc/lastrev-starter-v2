// This is a generated file from the list of pages in fixtures/generated_pages.json

describe(`Visit `, () => {
    it(`/websites renders correctly`, () => {
      cy.visit("/websites");

      // Percy
      cy.percySnapshot();
    });
  });
