Feature: Edit Contact
    As an authenticated user
    I want to edit a contact
    So that I can update contact information in my contact list

    Background:
        Given I am logged in as an existing user

    Scenario: Successfully edit a contact
        Given I am on the contact list page
        When I add a new contact
        And I navigate to the contact details of the new contact
        Then I should see the correct contact details

        When I edit the contact information
        Then I should be redirected to the contact list page
        And I should see the updated contact in the contact list
