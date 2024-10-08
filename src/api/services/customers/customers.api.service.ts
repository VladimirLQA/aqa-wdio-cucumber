import { Customers } from '../../../config/environment.js';
import { generateNewCustomer } from '../../../data/customers/generateNewCustomer.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { logAction, logStep } from '../../../utils/report/decorator.js';
import { CustomersApiClient } from '../../clients/customers.client.js';
import signInApiService from '../../../api/services/signIn/signIn.service.js';

export class CustomersApiService {
  constructor(private client = new CustomersApiClient()) {}

  @logStep('Create {amount} customers')
  async populateCustomers(amount: number = 1) {
    const token = await signInApiService.signInAsAdminApi();

    for (let i = 1; i <= amount; i++) {
      const cutomerToCreate = generateNewCustomer();
      const createdCustomer = await this.client.create(cutomerToCreate, token);

      expect(createdCustomer.status).toBe(STATUS_CODES.CREATED);

      Customers.add(createdCustomer.body.Customer);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomers() {
    const token = await signInApiService.signInAsAdminApi();

    for (const customer of Customers.getAll()) {
      const response = await this.client.delete(customer._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomer(email: string) {
    const token = await signInApiService.signInAsAdminApi();

    const customers = await this.client.getAll(token);
    const customerToDelete = customers.body.Customers.find((c) => c.email === email);
    if (customerToDelete) {
      const response = await this.client.delete(customerToDelete._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    } else {
      throw new Error(`Customer with email: '${email}' was not found`);
    }
  }
}
