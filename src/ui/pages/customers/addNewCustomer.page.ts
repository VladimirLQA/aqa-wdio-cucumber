import { ICustomer } from '../../../data/types/customer.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class AddNewCustomerPage extends SalesPortalPage {
  readonly uniqueElement: string = `//h2[.='Add New Customer ']`;

  readonly 'Email input' = `input#inputEmail`;

  readonly 'Name input' = `input#inputName`;

  readonly 'Country dropdown' = `select#inputCountry`;

  readonly 'City input' = `input#inputCity`;

  readonly 'Street input' = `input#inputStreet`;

  readonly 'House input' = `input#inputHouse`;

  readonly 'Flat input' = `input#inputFlat`;

  readonly 'Phone input' = `input#inputPhone`;

  readonly 'Notes textarea' = `textarea#textareaNotes`;

  readonly 'Save New Customer button' = `button#save-new-customer`;

  readonly 'Back button' = `button#back-to-customers-page`;

  readonly 'Clear all inputs button' = `button#clear-inputs`;

  async fillInputs(customer: Partial<ICustomer>) {
    customer.name && (await this.setValue(this['Name input'], customer.name));
    customer.country &&
      (await this.selectDropdownValue(this['Country dropdown'], customer.country));
    customer.email !== undefined && (await this.setValue(this['Email input'], customer.email));
    customer.flat !== undefined && (await this.setValue(this['Flat input'], customer.flat));
    customer.house !== undefined && (await this.setValue(this['House input'], customer.house));
    customer.street !== undefined && (await this.setValue(this['Street input'], customer.street));
    customer.city !== undefined && (await this.setValue(this['City input'], customer.city));
    customer.notes && (await this.setValue(this['Notes textarea'], customer.notes));
  }

  async clickOnSaveButton() {
    await this.click(this['Save New Customer button']);
  }

  async clickOnClearAllButton() {
    await this.click(this['Clear all inputs button']);
  }
}
