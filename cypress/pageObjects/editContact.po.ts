class editContact {

    editContactFirstName(firstName: string) {
        cy.get('input[id="firstName"]').clear().type(firstName);
        return this;
    }

    editContactLastName(lastName: string) {
        cy.get('input[id="lastName"]').clear().type(lastName);
        return this;
    }

    editContactEmail(email: string) {
        cy.get('input[id="email"]').clear().type(email);
        return this;
    }

    editContactPhone(phoneNumber: string) {
        cy.get('input[id="phone"]').clear().type(phoneNumber);
        return this;
    }

    editContactDateOfBirth(dateOfBirth: string) {
        cy.get('input[id="birthdate"]').clear().type(dateOfBirth);
        return this;
    }

    editContactStreetAddress1(address: string) {
        cy.get('input[id="street1"]').clear().type(address);
        return this;
    }

    editContactStreetAddress2(address: string) {
        cy.get('input[id="street2"]').clear().type(address);
        return this;
    }

    editContactCity(city: string) {
        cy.get('input[id="city"]').clear().type(city);
        return this;
    }

    editContactState(state: string) {
        cy.get('input[id="stateProvince"]').clear().type(state);
        return this;
    }

    editContactPostalCode(postalCode: string) {
        cy.get('input[id="postalCode"]').clear().type(postalCode);
        return this;
    }

    editContactCountry(country: string) {
        cy.get('input[id="country"]').clear().type(country);
        return this;
    }

    submit() {
        cy.get('button[id="submit"]').click();
    }

    cancel() {
        cy.get('button[id="cancel"]').click();
    }
}

export const editContactPage = new editContact();



