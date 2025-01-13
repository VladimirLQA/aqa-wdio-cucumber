import { logStep } from '../../utils/report/decorator.js';
import { SalesPortalPageService } from './salesPortal.service.js';
import homePage from '../pages/home.page.js';
import productsListPage from '../pages/products/products.page.js';
import customersListPage from '../pages/customers/customers-list.page.js';

class HomeService extends SalesPortalPageService {
  private homePage = homePage;
  private productsPage = productsListPage;
  private customersPage = customersListPage;

  @logStep('Open Products Page')
  async openProductsPage() {
    await this.homePage.clickOnMenuButton('Products');
    await this.productsPage.waitForPageOpened();
  }

  @logStep('Open Products Page')
  async openCustomersPage() {
    await this.homePage.clickOnMenuButton('Customers');
    await this.customersPage.waitForPageOpened();
  }

}

export default new HomeService();
