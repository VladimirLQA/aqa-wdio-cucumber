import { logStep } from '../../../utils/report/decorator';
import editProductPage from '../../pages/products/editProduct.page';
import { SalesPortalPageService } from '../salesPortal.service';

class EditProductPageService extends SalesPortalPageService {
  private editProductPage = editProductPage;

  @logStep('Validate Edit Product page title')
  async checkPageTitle(productName: string) {
    const actualTitle = await this.editProductPage.getTitleText();
    const expectedTitle = 'Edit ' + productName;
    expect(actualTitle).toBe(expectedTitle);
  }
}

export default new EditProductPageService();