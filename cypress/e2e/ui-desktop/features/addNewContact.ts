import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { addContact } from "pageObjects/addContact.po";
import { contactListPage } from "pageObjects/contactList.po";
import { loginPage } from "pageObjects/login.po";

Given("I am logged in as an existing user", () => {
  loginPage.existingUserLogin();
});

When("I navigate to the contact list page", () => {
  cy.url().should("include", "/contactList");
});

Then("I should be on the contact list page", () => {
  cy.url().should("include", "/contactList");
});

When("I add a new contact", () => {
  contactListPage.addContact();
});

Then("I should be redirected to the add contact page", () => {
  cy.url().should("include", "/addContact");
});

When("I enter all required contact data", () => {
  cy.generateContactData().then((contactData) => {
    addContact.enterAllContactData(contactData);
    cy.wrap(contactData).as("generatedContactData"); 
  });
});

When("I submit the new contact", () => {
  addContact.submit();
});

Then("I should be redirected to the contact list page", () => {
  cy.url().should("include", "/contactList");
});

Then("I should see the new contact in the contact list", () => {
  cy.get("@generatedContactData").then((contactData) => {
    addContact.assertContactInList(contactData);
  });
});
