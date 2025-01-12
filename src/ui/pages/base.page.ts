import { SalesPortalPage } from './salesPortal.page';

class BasePage extends SalesPortalPage {
  waitForPageOpened(): Promise<void> { return Promise.resolve(); }
}

export default new BasePage();

