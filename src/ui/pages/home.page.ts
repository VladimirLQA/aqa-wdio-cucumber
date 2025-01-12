import { TSideBarMenu } from '../../data/types/home.types.js';
import { SalesPortalPage } from './salesPortal.page.js';

class HomePage extends SalesPortalPage {
  readonly 'Orders button' = '#orders-from-home';
  readonly 'Products button' = '#products-from-home';
  readonly 'Customers button' = '#customers-from-home';
  readonly 'Logged User label' = '#sidemenu strong';

  async clickOnViewDetailsButton(moduleName: Exclude<TSideBarMenu, 'Home'>) {
    await this.click(this[`${moduleName} button`]);
  }

  readonly ['Menu Button'] = (menuItemName: TSideBarMenu) => `[name="${menuItemName}"]`;
  readonly ['Welcome label'] = '.welcome-text';

  async clickOnMenuButton(menuItemName: TSideBarMenu) {
    await this.click(this['Menu Button'](menuItemName));
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForSpinnersToBeHidden('Home');
    await this.waitForDisplayed(this['Welcome label']);
  }
}

export default new HomePage();
