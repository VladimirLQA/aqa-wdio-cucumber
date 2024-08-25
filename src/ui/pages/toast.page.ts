import { asyncMap } from '../../utils/async-array-methods.js';
import { SalesPortalPage } from './salesPortal.page.js';

export class ToastPage extends SalesPortalPage {
  readonly uniqueElement: string = '';
  readonly 'Toast body' = '.toast-body';
  readonly 'Close toast button' = 'button[aria-label="Close"]';

  async getToasText() {
    await this.waitForElement(this['Toast body']);
    const notifications = await this.waitForElementArray(this['Toast body']);
    const texts = asyncMap([...notifications], async (n) => await n.getText());
    return texts;
  }

  async clickOnToastCloseButton() {
    await this.click(this['Close toast button']);
  }
}
