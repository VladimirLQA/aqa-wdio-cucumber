import _ from 'lodash';
import { IProduct } from '../../../data/types/products/product.types';
import { logStep } from '../../../utils/report/decorator';
import addNewProductPage from '../../pages/products/addNewProduct.page';
import editProductPage from '../../pages/products/editProduct.page';
import productsListPage from '../../pages/products/products.page';
import { SalesPortalPageService } from '../salesPortal.service';
import { generateNewProduct } from '../../../data/products/generateProduct';

class ProductsPageService extends SalesPortalPageService {
  private productsPage = productsListPage;
  private addNewProductPage = addNewProductPage;
  private editProductPage = editProductPage;

  @logStep('Open Add New Product Page')
  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForPageOpened();
  }

  // @logStep('Create product')
  // async createProduct(productData?: Partial<IProduct>) {
  //   const product = generateNewProduct(productData);
  //   await this.addNewProductPage.fillInputs(product);
  //   await this.addNewProductPage.clickOnSaveButton();
  //   await this.productsPage.waitForPageOpened();
  //   return product;
  // }

  @logStep('Open Edit Product Page')
  async openEditProductPage(productName: string) {
    await this.productsPage.clickOnEditProductButton(productName);
    await this.editProductPage.waitForPageOpened();
  }

  @logStep('Check Product In Table')
  async checkProductInTable(product: IProduct) {
    const actualProductData = await this.productsPage.getProductFromTable(product.name);
    const expectedProductData = _.pick(product, ['name', 'price', 'manufacturer']);
    expect(actualProductData).toEqual(expectedProductData);
  }

  @logStep('Delete Product via UI')
  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.productsPage['Delete Modal'].waitForPageOpened();
    await this.productsPage['Delete Modal'].clickOnDeleteButton();
    await this.productsPage['Delete Modal'].waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }
}

export default new ProductsPageService();
