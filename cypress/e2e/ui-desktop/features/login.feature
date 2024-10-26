Feature: User Login

    As a user, I want to be able to log in with valid credentials so that I can access the contact list page.

    Scenario: Login with valid credentials
        Given I am on the login page
        When I enter valid credentials
        Then I should be redirected to the contact list page
