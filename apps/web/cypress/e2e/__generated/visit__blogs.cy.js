// This is a generated file from the list of pages in fixtures/generated_pages.json

describe(`Visit `, () => {
    it(`/blogs renders correctly`, () => {
      cy.visit("/blogs");

      // Percy
      cy.percySnapshot();
    });
  });
