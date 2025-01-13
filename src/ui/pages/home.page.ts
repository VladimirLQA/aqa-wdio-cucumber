import { TSideBarMenu } from '../../data/types/home.types';
import { SalesPortalPage } from './salesPortal.page';

class HomePage extends SalesPortalPage {
  readonly 'Orders button' = '#orders-from-home';
  readonly 'Products button' = '#products-from-home';
  readonly 'Customers button' = '#customers-from-home';
  readonly 'Logged User label' = '#sidemenu strong';
  readonly ['Menu Button'] = (menuItemName: TSideBarMenu) => `[name="${menuItemName}"]`;
  readonly ['Welcome label'] = '.welcome-text';

  async waitForPageOpened(): Promise<void> {
    await this.waitForSpinnersToBeHidden('Home');
    await this.waitForDisplayed(this['Welcome label']);
  }

  async clickOnViewDetailsButton(moduleName: Exclude<TSideBarMenu, 'Home'>) {
    await this.click(this[`${moduleName} button`]);
  }

  async clickOnMenuButton(menuItemName: TSideBarMenu) {
    await this.click(this['Menu Button'](menuItemName));
  }
}

export default new HomePage();
