import { apiConfig } from '../../config/apiConfig.js';
import { IRequestOptions } from '../../data/types/api/api.types.js';
import type { ILoginResponse, IUserCredentials } from '../../data/types/users/user.types.js';
import { AxiosApiClient } from '../apiClients/axios.js';
import { logStep } from '../../utils/report/decorator.js';

export class SignInController {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Sign in via API')
  async login(credentials: IUserCredentials) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
      headers: { 'Content-Type': 'application/json' },
      data: credentials,
    };
    return this.apiClient.send<ILoginResponse>(options);
  }
}

export default new SignInController();
