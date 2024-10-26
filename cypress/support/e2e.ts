import './commands'

beforeEach(() => {
    cy.visit('/');
});

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Cannot read properties of null")) {
      return false;
    }
  });
  