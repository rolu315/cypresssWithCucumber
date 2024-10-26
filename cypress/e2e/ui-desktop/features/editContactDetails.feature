Feature: Contacts can be edited and changes confirmed

    Background:
        Given I am logged into the contact list application

    Scenario: Edit a contact and confirm the updated information
        Given I have added a new contact with generated data
        When I navigate to the newly added contact's details page
        Then I should see the contact's details displayed correctly

        When I edit the contact with new generated data
        Then I should see the updated contact details on the details page

        When I return to the contact list
        Then I should see the updated contact in the contact list
        And I should not see the original contact in the contact list

