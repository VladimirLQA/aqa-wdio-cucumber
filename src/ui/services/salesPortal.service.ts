import { GetTextMethod } from '../../data/types/common.types';
import { logStep } from '../../utils/report/decorator';
import basePage from '../pages/base.page';

export abstract class SalesPortalPageService {
  private basePage = basePage;

  @logStep('Validate Notification')
  async validateNotification(text: string, method: GetTextMethod = 'with') {
    const notification = await this.basePage.getNotificationText(text, method);
    expect(notification).toBe(text);
  }

  @logStep('Log out')
  async signOut() {
    await this.basePage.deleteCookies(['Authorization']);
  }

  async getToken() {
    const token = await this.basePage.getCookie('Authorization');
    return token.value;
  }
}