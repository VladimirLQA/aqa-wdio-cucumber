import { BasePage } from "./base.page.js";

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = ".spinner-border";
  readonly "Notification label" = ".toast-body";
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }
}
