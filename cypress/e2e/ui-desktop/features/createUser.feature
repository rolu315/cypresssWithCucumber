Feature: Create New User
    As a new user
    I want to be able to sign up, handle errors, and log in
    So that I can access the contact list page

    Background:
        Given I am on the sign-up page

    Scenario: Create a new user successfully
        When I enter new user details
        And I submit the sign-up form
        Then I should be redirected to the contact list page

    Scenario: Attempt to create a user with an existing email
        When I enter details for a new user with an existing email
        And I submit the sign-up form
        Then I should see an email error message

    Scenario: Login with newly created user
        When I create a new user and sign up
        And I log out and return to the login page
        And I log in with the new user's credentials
        Then I should be redirected to the contact list page
