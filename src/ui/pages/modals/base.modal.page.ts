import { SalesPortalPage } from '../salesPortal.page.js';

export class BaseModalPage extends SalesPortalPage {
  readonly uniqueElement: string = 'Provide uniqueElement selector';

  readonly 'Close modal button' = 'div.modal-header button[aria-label="Close"]';
  readonly 'Cancel modal button' = `//div[@class="modal-footer"]/button[.="Cancel"]`;

  async clicOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async clicOnCancelModalButton() {
    await this.click(this['Cancel modal button']);
  }
}
