import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.url().should('include', '/');
});

When('I enter valid credentials', () => {
  const loginCredentials = Cypress.env('login');
  const email = loginCredentials.email;
  const password = loginCredentials.password;
  cy.login(email, password);
});

Then('I should be redirected to the contact list page', () => {
  cy.url().should('include', '/contactList');
});