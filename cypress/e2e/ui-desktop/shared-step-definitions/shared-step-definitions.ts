import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "pageObjects/login.po";

Given("I am logged into the contact list application", () => {
    loginPage.existingUserLogin();
    cy.url().should('include', '/contactList');
  });