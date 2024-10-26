import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { addContact } from "pageObjects/addContact.po";
import { contactDetails } from "pageObjects/contactDetails.po";
import { contactListPage } from "pageObjects/contactList.po";
import { loginPage } from "pageObjects/login.po";

Given("I am logged in as an existing user", () => {
  loginPage.existingUserLogin();
});

Given("I am on the contact list page", () => {
  cy.url().should("include", "/contactList");
});

When("I add a new contact", () => {
  cy.generateContactData().then((contactData) => {
    contactListPage.addContact();
    addContact.enterAllContactData(contactData).submit();
    cy.wrap(contactData).as("contactData");
  });
});

When("I navigate to the contact details of the new contact", () => {
  cy.get("@contactData").then((contactData: any) => {
    cy.get(".contacts")
      .contains("td", `${contactData.firstName} ${contactData.lastName}`)
      .parent()
      .within(() => {
        cy.get("td").eq(1).click();
      });
  });
  cy.url().should("include", "/contactDetails");
});

Then("I should see the correct contact details", () => {
  cy.get("@contactData").then((contactData: any) => {
    contactDetails.getContactFirstName().should("contain", contactData.firstName);
    contactDetails.getContactLastName().should("contain", contactData.lastName);
  });
});

When("I edit the contact information", () => {
  contactDetails.getEditContactButton().click();
  cy.url().should("include", "/editContact");

  cy.generateContactData().then((updatedContactData) => {
    addContact.enterAllContactData(updatedContactData).submit();
    cy.wrap(updatedContactData).as("updatedContactData");
  });
});

Then("I should be redirected to the contact list page", () => {
  cy.url().should("include", "/editContact");
});

Then("I should see the updated contact in the contact list", () => {
  cy.get("@updatedContactData").then((updatedContactData: any) => {
    cy.get(".contacts")
      .contains("td", `${updatedContactData.firstName} ${updatedContactData.lastName}`)
      .should("exist");
  });
});
