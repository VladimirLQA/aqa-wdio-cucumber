import { SalesPortalPage } from '../salesPortal.page.js';

export abstract class BaseModalPage extends SalesPortalPage {
  readonly ['Modal container'] = '//div[@role="dialog"]';
  readonly ['Close modal button'] = 'div.modal-header button[aria-label="Close"]';
  readonly ['Cancel modal button'] = `//div[@class="modal-footer"]/button[.="Cancel"]`;

  async clicOnCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async clicOnCancelModalButton() {
    await this.click(this['Cancel modal button']);
  }
}
