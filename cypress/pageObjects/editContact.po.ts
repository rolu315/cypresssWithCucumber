class editContact {

    editContactFirstName() {
        return cy.get('input[name="firstName"]');
    }

    editContactLastName() {
        return cy.get('input[name="lastName"]');
    }

    editContactDateOfBirth() {
        return cy.get('input[name="dateOfBirth"]');
    }

    editContactEmail() {
        return cy.get('input[name="email"]');
    }

    editContactPhone() {
        return cy.get('input[name="phone"]');
    }

    editContactStreetAddress1() {
        return cy.get('input[name="streetAddress1"]');
    }

    editContactStreetAddress2() {
        return cy.get('input[name="streetAddress2"]');
    }

    editContactCity() {
        return cy.get('input[name="city"]');
    }

    editContactState() {
        return cy.get('input[name="state"]');
    }

    editContactZip() {
        return cy.get('input[name="zip"]');
    }

    editContactCountry() {
        return cy.get('input[name="country"]');
    }

    submit() {
        return cy.get('button[type="submit"]');
    }

    cancel() {
        return cy.get('button[type="button"]');
    }
}