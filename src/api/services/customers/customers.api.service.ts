import { Customers } from "../../../config/environment.js";
import { generateNewCustomer } from "../../../data/customers/generateNewCustomer.js";
import { STATUS_CODES } from "../../../data/types/api.types.js";
import { logAction } from "../../../utils/report/decorator.js";
import { CustomersApiClient } from "../../clients/customers.client.js";
import signInApiService from "../../../api/services/signIn/signIn.service.js";

export class CustomersApiService {
  constructor(
    private client = new CustomersApiClient()
  ) { }

  @logAction('Create {amount} customers')
  async populateCustomers(amount: number = 1) {
    const token = await signInApiService.signInAsAdminApi();
    for (let i = 1; i <= amount; i++) {
      const cutomerToCreate = generateNewCustomer()
      const createdCustomer = (await this.client
        .create(cutomerToCreate, token));
      expect(createdCustomer.status).toBe(STATUS_CODES.CREATED);

      Customers.add(createdCustomer.body.Customer);
    }
  }
}