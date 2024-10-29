import './commands'


//allows us to skip calling the baseUrl for API tests
before(() => {
  if (Cypress.env('testType') === 'ui') {
    cy.visit('/');
  } else {
    cy.log('Skipping UI setup for API tests');
  }
});

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Cannot read properties of null")) {
      return false;
    }
  });
  