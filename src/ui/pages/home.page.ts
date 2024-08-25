import { SalesPortalPage } from './salesPortal.page.js';

export class HomePage extends SalesPortalPage {
  uniqueElement = '#contentInner #myCarousel';

  readonly 'Orders button' = '#orders-from-home';
  readonly 'Products button' = '#products-from-home';
  readonly 'Customers button' = '#customers-from-home';
  readonly 'Logged User label' = '#sidemenu strong';

  async clickOnViewDetailsButton(moduleName: 'Products' | 'Customers' | 'Orders') {
    await this.click(this[`${moduleName} button`]);
  }
}
