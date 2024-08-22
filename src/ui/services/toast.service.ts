import { ToastPage } from '../pages/toast.page';

export class ToastService {
  constructor(private toastPage = new ToastPage()) {}

  async verifyToastMessage(actual: string, expected: string) {
    expect(actual).toBe(expected);
  }

  async getToastTextAndClose() {
    const text = await this.toastPage.getToasText();
    await this.toastPage.clickOnCloseToastButton();
    return text;
  }
}
