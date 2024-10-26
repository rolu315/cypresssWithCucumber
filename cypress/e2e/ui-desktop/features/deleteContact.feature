Feature: Delete Contact
    As an authenticated user
    I want to delete a contact from my contact list
    So that I can keep my contact list up to date

    Background:
        Given I am logged in as an existing user

    Scenario: Successfully delete a new contact
        Given I am on the contact list page
        When I add a new contact
        And I navigate to the contact details of the new contact
        Then I should see the correct contact details

        When I delete the contact
        Then I should be redirected to the contact list page
        And I should not see the deleted contact in the list
