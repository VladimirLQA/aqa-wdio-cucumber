import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  abstract readonly uniqueElement: string;
  // readonly 'Toast body' = '.toast-body';
  // readonly 'Close toast button' = 'button[aria-label="Close"]';

  // async getToasText() {
  //   const text = await this.getText(this['Toast body']);
  //   return text;
  // }

  // async clickOnCloseToastButton() {
  //   await this.click(this['Close toast button']);
  // }
  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }
}
