import { IProduct } from '../../../data/types/product.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';
import { AddEditProductPage } from './addEditProduct.page.js';

class EditProductPage extends AddEditProductPage {
  readonly ['Title'] = 'h2.page-title-text';
  readonly ['Save Product button'] = '#save-product-changes';
  readonly ['Delete Product button'] = '#delete-product-btn';

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForDisplayed(this['Save Product button']);
  }

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async clickOnSaveButton() {
    await this.click(this['Save Changes button']);
  }

  async clickOnDeleteButton() {
    await this.click(this['Delete Product button']);
  }
}

export default new EditProductPage();
