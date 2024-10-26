Feature: Add New Contact
    As an authenticated user
    I want to be able to add a new contact
    So that I can see the contact in my contact list

    Background:
        Given I am logged in as an existing user

    Scenario: Add a new contact successfully
        When I navigate to the contact list page
        Then I should be on the contact list page

        When I add a new contact
        Then I should be redirected to the add contact page

        When I enter all required contact data
        And I submit the new contact
        Then I should be redirected to the contact list page
        And I should see the new contact in the contact list
