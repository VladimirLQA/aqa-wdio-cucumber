import { SalesPortalPage } from './salesPortal.page';

export class ToastPage extends SalesPortalPage {
  readonly uniqueElement: string = '';
  readonly 'Toast body' = '.toast-body';
  readonly 'Close toast button' = 'button[aria-label="Close"]';

  async getToasText() {
    const text = await this.getText(this['Toast body']);
    return text;
  }

  async clickOnCloseToastButton() {
    await this.click(this['Close toast button']);
  }
}
