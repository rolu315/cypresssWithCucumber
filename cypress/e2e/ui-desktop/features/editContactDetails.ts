import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { addContact } from "pageObjects/addContact.po";
import { contactDetails } from "pageObjects/contactDetails.po";
import { contactListPage } from "pageObjects/contactList.po";
import { editContactPage } from "pageObjects/editContact.po";
import randomlyEditContactFields from "utilities/utilities";

Given("I have added a new contact with generated data", () => {
  cy.generateContactData().then((data) => {
    cy.wrap(data).as("contactData"); 
    contactListPage.addContact();
    addContact.enterAllContactData(data).submit();
  });
});

When("I navigate to the newly added contact's details page", () => {
  cy.get("@contactData").then((contactData: any) => {
    cy.get('.contacts')
      .contains('td', `${contactData.firstName} ${contactData.lastName}`)
      .parent()
      .within(() => {
        cy.get('td').eq(1).click();
      });
    cy.url().should('include', '/contactDetails');
  });
});

Then("I should see the contact's details displayed correctly", () => {
  cy.get("@contactData").then((contactData: any) => {
    contactDetails.getContactFirstName().should('contain', contactData.firstName);
    contactDetails.getContactLastName().should('contain', contactData.lastName);
  });
});

When("I edit the contact with new generated data", () => {
  contactDetails.getEditContactButton().click();
  cy.url().should('include', '/editContact');

  cy.generateContactData().then((updatedData) => {
    const modifiedData = randomlyEditContactFields(updatedData);
    cy.wrap(modifiedData).as("modifiedData"); 
    editContactPage.submit();
  });
});

Then("I should see the updated contact details on the details page", () => {
  cy.get("@modifiedData").then((modifiedData: any) => {
    if (modifiedData.firstName) {
      contactDetails.getContactFirstName().should("contain", modifiedData.firstName);
    }
    if (modifiedData.lastName) {
      contactDetails.getContactLastName().should("contain", modifiedData.lastName);
    }
  });
});

When("I return to the contact list", () => {
  contactDetails.getReturnToContactListButton().click();
  cy.url().should('include', '/contactList');
});

Then("I should see the updated contact in the contact list", () => {
  cy.get("@modifiedData").then((modifiedData: any) => {
    cy.get("@contactData").then((contactData: any) => {
      cy.get('.contacts')
        .contains('td', `${modifiedData.firstName || contactData.firstName} ${modifiedData.lastName || contactData.lastName}`)
        .should('exist');
    });
  });
});

Then("I should not see the original contact in the contact list", () => {
  cy.get("@contactData").then((contactData: any) => {
    cy.get("@modifiedData").then((modifiedData: any) => {
      if (modifiedData.firstName || modifiedData.lastName) {
        cy.get('.contacts')
          .contains('td', `${contactData.firstName} ${contactData.lastName}`)
          .should('not.exist');
      }
    });
  });
});
