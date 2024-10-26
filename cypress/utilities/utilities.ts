
import { faker } from '@faker-js/faker';
import { editContactPage } from 'pageObjects/editContact.po';


function randomlyEditContactFields(initialData: any) {
    const modifiedData: any = {};
    const fields = [
      () => {
        modifiedData.firstName = faker.person.firstName();
        editContactPage.editContactFirstName(modifiedData.firstName);
      },
      () => {
        modifiedData.lastName = faker.person.lastName();
        editContactPage.editContactLastName(modifiedData.lastName);
      },
        () => {
            modifiedData.email = faker.internet.email({ provider: "tester.com" }).toLocaleLowerCase();
            editContactPage.editContactEmail(modifiedData.email);
        },
        () => {
            modifiedData.phoneNumber = faker.phone.number({ style: "national" });
            editContactPage.editContactPhone(modifiedData.phoneNumber);
        },
        () => {
            modifiedData.birthdate = faker.date.birthdate({ mode: "age", min: 18, max: 65 }).toISOString().split("T")[0];
            editContactPage.editContactDateOfBirth(modifiedData.birthdate);
        },
        () => {
            modifiedData.streetAddress1 = faker.location.streetAddress();
            editContactPage.editContactStreetAddress1(modifiedData.streetAddress1);
        },
        () => {
            modifiedData.streetAddress2 = faker.location.secondaryAddress();
            editContactPage.editContactStreetAddress2(modifiedData.streetAddress2);
        },
        () => {
            modifiedData.city = faker.location.city();
            editContactPage.editContactCity(modifiedData.city);
        },
        () => {
            modifiedData.state = faker.location.state();
            editContactPage.editContactState(modifiedData.state);
        },
        () => {
            modifiedData.postalCode = faker.location.zipCode();
            editContactPage.editContactPostalCode(modifiedData.postalCode);
        },
        () => {
            modifiedData.country = faker.location.country();
            editContactPage.editContactCountry(modifiedData.country);
        },
    ];
  
    fields.forEach((editField) => {
      if (Math.random() > 0.5) {
        editField();
      }
    });
    return modifiedData;
  }
  
  export default randomlyEditContactFields;
  