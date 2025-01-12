import { SignInController } from '../../clients/signIn.controller.js';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment.js';
import { logStep } from '../../../utils/report/decorator.js';
import { validateResponse } from '../../../utils/validation/response.js';
import { STATUS_CODES } from '../../../data/types/api/api.types.js';

class SignInApiService {
  private token: string | null = null;

  constructor(private controller = new SignInController()) { }

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const response = await this.controller.login({
      username: ADMIN_USERNAME, password: ADMIN_PASSWORD
    });
    validateResponse(response, STATUS_CODES.OK, true, null);
    this.setToken(response.headers['authorization']);
    return this.getToken();
  }

  removeToken() {
    this.token = null;
  }

  getToken() {
    return this.getConvertedToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  private getConvertedToken() {
    return `Bearer ${this.token}`;
  }
}

export default new SignInApiService();
