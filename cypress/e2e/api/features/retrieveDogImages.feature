Feature: Retrieve random dog image

    Scenario: User retrieves a random dog image with breed information
        Given the Dog API endpoint is correct
        When the user sends a request to fetch a random dog image
        Then the response status should be 200
        And the response should contain a jpg image with breed information
