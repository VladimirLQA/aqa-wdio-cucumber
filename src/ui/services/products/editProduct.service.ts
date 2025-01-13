import { logStep } from '../../../utils/report/decorator';
import editProductPage from '../../pages/products/editProduct.page';
import { SalesPortalPageService } from '../salesPortal.service';
import productsPage from '../../pages/products/products.page';
import { generateNewProduct } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/products/product.types';

class EditProductPageService extends SalesPortalPageService {
  private editProductPage = editProductPage;
  private productsPage = productsPage;

  @logStep('Validate Edit Product page title')
  async checkPageTitle(productName: string) {
    const actualTitle = await this.editProductPage.getTitleText();
    const expectedTitle = 'Edit ' + productName;
    expect(actualTitle).toBe(expectedTitle);
  }

  @logStep('Update product')
  async updateProduct(productData?: Partial<IProduct>) {
    const updatedProduct = generateNewProduct(productData);
    updatedProduct.price = +updatedProduct.price;
    await this.editProductPage.fillInputs(updatedProduct);
    await this.editProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
    return updatedProduct;
  }
}

export default new EditProductPageService();