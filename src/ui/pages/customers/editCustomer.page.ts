import { AddEditCustomersPage } from './addEditCustomers.page.js';

class EditCutomerPage extends AddEditCustomersPage {
  readonly ['Save Customer button'] = `button#save-customer-changes`;
  readonly ['Title'] = `h2.page-title-text`;

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForDisplayed(this['Save Customer button']);
  }
}

export default new EditCutomerPage();
