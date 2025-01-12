import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { IRequestOptions, IResponse } from '../../data/types/api/api.types.js';
import { AllureReporter } from '../../utils/report/allure.reporter.js';

export class AxiosApiClient {
  private response: AxiosResponse | undefined;

  constructor(private reporter = new AllureReporter()) {}

  async send<T>(options: IRequestOptions): Promise<IResponse<T>> {
    try {
      this.response = await axios(options as AxiosRequestConfig);
      return this.transformResponse();
    } catch (err: unknown) {
      if (!isAxiosError(err)) throw err;

      console.log('Error', err.message);
      console.log('Request URL:', options.method, options.url);

      this.response = err.response;
      return this.transformResponse();
    } finally {
      this.reporter.reportApiRequest(options, this.transformResponse());
    }
  }

  private transformResponse() {
    return {
      status: this.response!.status,
      body: this.response && this.response.data ? this.response.data : null,
      headers: this.response!.headers,
    };
  }
}
