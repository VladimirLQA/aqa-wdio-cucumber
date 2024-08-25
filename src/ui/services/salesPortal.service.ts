// import { HomePage } from '../pages/home.page';
import { ToastPage } from '../pages/toast.page.js';

export class SalesPortalService {
  constructor(private toastPage = new ToastPage()) {}
  async verifyToastMessage(actual: string, expected: string) {
    expect(actual).toBe(expected);
  }

  async getToastTextAndClose() {
    const text = await this.toastPage.getToasText();
    await this.toastPage.clickOnToastCloseButton();
    return text;
  }
}
