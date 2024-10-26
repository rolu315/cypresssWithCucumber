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

// Step to delete the contact
When("I delete the contact", () => {
  contactDetails.getDeleteContactButton().click();
  cy.handleConfirmDialog("Are you sure you want to delete this contact?", true);
});

// Step to verify we are redirected to the contact list page
Then("I should be redirected to the contact list page", () => {
  cy.url().should("include", "/contactList");
});

// Step to ensure the contact is no longer in the list
Then("I should not see the deleted contact in the list", () => {
  cy.get("@contactData").then((contactData: any) => {
    cy.get(".contacts")
      .contains("td", `${contactData.firstName} ${contactData.lastName}`)
      .should("not.exist");
  });
});
