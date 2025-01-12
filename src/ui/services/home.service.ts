import { logStep } from '../../utils/report/decorator.js';
import { SalesPortalService } from './salesPortal.service.js';
import homePage from '../pages/home.page.js';
import productsPage from '../pages/products/products.page.js';

export class HomeService extends SalesPortalService {
  private homePage = homePage;
  private productsPage = productsPage;

  @logStep('Open Products Page')
  async openProductsPage() {
    await this.homePage.clickOnMenuButton('Products');
    await this.productsPage.waitForPageOpened();
  }

}
