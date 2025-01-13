// import { ToastPage } from '../pages/toast.page.js';

// export class ToastService {
//   constructor(private toastPage = new ToastPage()) {}

//   async verifyToastMessage(toasts: string[], expected: string) {
//     const isDisplayed = toasts.some((t) => t === expected);
//     expect(isDisplayed).toBe(true);
//   }

//   async getToastTextAndClose() {
//     const text = await this.toastPage.getToasText();
//     await this.toastPage.clickOnToastCloseButton();
//     return text;
//   }
// }
