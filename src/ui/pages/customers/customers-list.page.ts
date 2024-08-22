import { SalesPortalPage } from '../salesPortal.page.js';

export class CustomersListPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Customers List "]';

  readonly 'Add New customer button' = `button.page-title-button`;

  readonly 'Table row selector' = (customer: string) => `//tr[./td[text()="${customer}"]]`;

  readonly 'Name by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}/td[2]`;

  readonly 'Email by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}/td[1]`;

  readonly 'Country by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}/td[3]`;

  readonly 'Edit button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;

  readonly 'Delete button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Delete"]`;

  readonly 'Details button by table row' = (customer: string) =>
    `${this['Table row selector'](customer)}//button[@title="Details"]`;

  async clickOnAddNewCustomerButton() {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomerButton(customerEmail: string) {
    await this.click(this['Edit button by table row'](customerEmail));
  }

  async getDataByEmail(email: string) {
    const [country, name] = await Promise.all([
      this.getText(this['Country by table row'](email)),
      this.getText(this['Name by table row'](email)),
    ]);
    return { name, country, email };
  }
}
