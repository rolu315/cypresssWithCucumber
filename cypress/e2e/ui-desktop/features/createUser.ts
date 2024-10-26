import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { contactListPage } from "pageObjects/contactList.po";
import { loginPage } from "pageObjects/login.po";
import { signupPage } from "pageObjects/signUp.po";

Given("I am on the sign-up page", () => {
  signupPage.visit();
});

When("I enter new user details", () => {
  cy.createUser().then((signUpData) => {
    signupPage.signUpNewUser(signUpData);
  });
});

When("I submit the sign-up form", () => {
  signupPage.submit();
});

Then("I should be redirected to the contact list page", () => {
  contactListPage.validateContactListUrl();
});

When("I enter details for a new user with an existing email", () => {
  cy.createUser().then((signUpUser1) => {
    signupPage.signUpNewUser(signUpUser1).submit();
    contactListPage.validateContactListUrl();
    cy.wrap(signUpUser1.email).as("existingEmail");
    contactListPage.logout();
  });

  signupPage.visit();
  cy.createUser().then((signUpUser2) => {
    cy.get("@existingEmail").then((email) => {
      signupPage.enterFirstName(signUpUser2.firstName);
      signupPage.enterLastName(signUpUser2.lastName);
      signupPage.enterEmail(email.toString());
      signupPage.enterPassword(signUpUser2.password);
    });
  });
});

Then("I should see an email error message", () => {
  signupPage.isEmailErrorMessageDisplayed();
});

When("I create a new user and sign up", () => {
  cy.createUser().then((signUpUser) => {
    signupPage.signUpNewUser(signUpUser).submit();
    contactListPage.validateContactListUrl();
    cy.wrap(signUpUser).as("newUser");
  });
});

When("I log out and return to the login page", () => {
  contactListPage.logout();
  loginPage.validateLoginUrl();
});

When("I log in with the new user's credentials", () => {
  cy.get("@newUser").then((newUser: any) => {
    loginPage.login(newUser.email, newUser.password);
  });
});
