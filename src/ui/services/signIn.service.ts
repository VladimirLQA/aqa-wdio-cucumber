import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import type { IUserCredentials } from '../../data/types/users/user.types';
import { logStep } from '../../utils/report/decorator';
import { SalesPortalPageService } from './salesPortal.service';
import homePage from '../pages/home.page';
import signInPage from '../pages/signIn.page';

class SignInService extends SalesPortalPageService {
  private signInPage = signInPage;
  private homePage = homePage;

  @logStep('Open Sales Portal')
  async openSalesPortal() {
    await this.signInPage.open();
  }

  @logStep('Login to Sales Portal')
  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLoginButton();
    await this.homePage.waitForPageOpened();
  }

  @logStep('Login as admin')
  async loginAsAdmin() {
    await this.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }

  @logStep('Sign Out')
  async signOut() {
    await this.signInPage.deleteCookies(['Authorization']);
  }
}

export default new SignInService();
