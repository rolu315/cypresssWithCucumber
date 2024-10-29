import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('the Dog API endpoint is correct', function () {
  const apiUrl: string = "/v1/images/search"; 
  cy.wrap(apiUrl).as('apiUrl'); 
});

When('the user sends a request to fetch a random dog image', function () {
  const queryParams = {
    size: 'med',
    mime_types: 'jpg',
    format: 'json',
    has_breeds: 'true',
    order: 'RANDOM',
    page: 0,
    limit: 10
  };

  cy.request({
    method: 'GET',
    url: `${Cypress.env('host')}${this.apiUrl as string}`, 
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "3dd16300-1408-498e-a3ba-b9e6ccb77d97"
    },
    qs: queryParams
  }).then((res) => {
    cy.wrap(res).as('response');
  });
});

Then('the response status should be 200', function () {
  expect(this.response.status).to.eq(200);
});

Then('the response should contain a jpg image with breed information', function () {
  expect(this.response.body).to.be.an('array').that.is.not.empty;

  const dogImage = this.response.body[0];
  expect(dogImage).to.have.property('url').that.includes('.jpg');
});
