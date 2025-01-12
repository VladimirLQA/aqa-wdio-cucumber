import { AddEditProductPage } from './addEditProduct.page.js';

class AddNewProductPage extends AddEditProductPage {
  readonly Title = '//h2[.="Add New Product "]';
  readonly ['Save Product button'] = '#save-new-product';

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForDisplayed(this['Save Product button']);
  }
}

export default new AddNewProductPage();
