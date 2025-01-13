import { SalesPortalPage } from '../salesPortal.page';

class FiltersModalPage extends SalesPortalPage {
  // TODO implement method
  async waitForPageOpened(): Promise<void> {
    return Promise.resolve();
  }
}
export default new FiltersModalPage();
