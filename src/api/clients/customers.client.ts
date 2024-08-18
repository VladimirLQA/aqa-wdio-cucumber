import { apiConfig } from "../../config/apiConfig.js";
import { IRequestOptions } from "../../data/types/api.types.js";
import { ICustomer, ICustomerResponse } from "../../data/types/customer.types.js";
import { AxiosApiClient } from "../../utils/apiClients/axios";
import { logStep } from "../../utils/report/decorator.js";

export class CustomersApiClient {
    constructor(private apiClient = new AxiosApiClient()) {}
  
    @logStep("Create customer via API")
    async create(customer: ICustomer, token: string) {
      const options: IRequestOptions = {
        method: "post",
        baseURL: apiConfig.baseUrl,
        url: apiConfig.endpoints.Customers,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: customer,
      };
      return this.apiClient.send<ICustomerResponse>(options);
    }
  
    @logStep("Get customer by id via API")
    async getById(id: string, token: string) {
      const options: IRequestOptions = {
        baseURL: apiConfig.baseUrl,
        url: apiConfig.endpoints["Get Customer By Id"](id),
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      };
      return this.apiClient.send<ICustomerResponse>(options);
    }
  
    @logStep("Get all customers via API")
    async getAll(token: string) {
      const options: IRequestOptions = {
        baseURL: apiConfig.baseUrl,
        url: apiConfig.endpoints.Customers,
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      };
      return this.apiClient.send<ICustomerResponse>(options);
    }
  
    @logStep("Update customer via API")
    async update(data: ICustomer & { _id: string }, token: string) {
      const options: IRequestOptions = {
        baseURL: apiConfig.baseUrl,
        url: apiConfig.endpoints.Customers,
        method: "put",
        headers: { "Content-Type": "application/json", Authorization: token },
        data: data,
      };
      return this.apiClient.send<ICustomerResponse>(options);
    }
  
    @logStep("Delete customer via API")
    async delete(id: string, token: string) {
      const options: IRequestOptions = {
        baseURL: apiConfig.baseUrl,
        url: apiConfig.endpoints["Get Customer By Id"](id),
        method: "delete",
        headers: { "Content-Type": "application/json", Authorization: token },
      };
      return this.apiClient.send<null>(options);
    }
  }