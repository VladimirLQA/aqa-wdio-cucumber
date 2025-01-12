import { generateNewProduct } from '../../../data/products/generateProduct';
import { IProduct } from '../../../data/types/products/product.types';
import { logStep } from '../../../utils/report/decorator';
import addNewProductPage from '../../pages/products/addNewProduct.page';
import productsPage from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortal.service';

class AddNewProductService extends SalesPortalPageService {
  private addNewProductPage = addNewProductPage;
  private productsPage = productsPage;

  @logStep('Create product via UI')
  async populate(product?: IProduct) {
    const productData = generateNewProduct(product);
    await this.addNewProductPage.fillInputs(productData);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
    return productData;
  }
}

export default new AddNewProductService();
