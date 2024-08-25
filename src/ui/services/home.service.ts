import { logStep } from '../../utils/report/decorator.js';
import { CustomersListPage } from '../pages/customers/customers-list.page.js';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products/products.page.js';
import { SalesPortalService } from './salesPortal.service.js';

export class HomeService extends SalesPortalService {
  constructor(
    private homePage = new HomePage(),
    private productsPage = new ProductsPage(),
    private customersPage = new CustomersListPage(),
  ) {
    super();
  }

  @logStep('Open products page')
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  @logStep('Open customers page')
  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton('Customers');
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }
}
