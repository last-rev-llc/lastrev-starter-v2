cy.intercept('GET', '/static/css/slick.css', (req) => {
  req.destroy(); // Prevent the request from going to the server
}).as('ignoreCSS');
