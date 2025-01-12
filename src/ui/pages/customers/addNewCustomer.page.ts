import { ICustomer } from '../../../data/types/customers/customer.types.js';
import { AddEditCustomersPage } from './addEditCustomers.page.js';

class AddNewCustomerPage extends AddEditCustomersPage {
  readonly ['Save Customer button'] = `button#save-new-customer`;
  readonly 'Clear all inputs button' = `button#clear-inputs`;
  readonly ['Title'] = `//h2[.="Add New Customer "]`;

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForDisplayed(this['Save Customer button']);
  }

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

export default new AddNewCustomerPage();