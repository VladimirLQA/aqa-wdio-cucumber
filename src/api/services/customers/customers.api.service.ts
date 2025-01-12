import { Customers } from '../../../config/environment.js';
import { generateNewCustomer } from '../../../data/customers/generateCustomer.js';
import { STATUS_CODES } from '../../../data/types/api/api.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import CustomersController from '../../clients/customers.controller.js';
import signInApiService from '../signIn/signIn-api.service.js';

export class CustomersApiService {
  constructor(private controller = CustomersController) {}

  @logStep('Create {amount} customers')
  async populateCustomers(amount: number = 1 ) {
    const token = await signInApiService.signInAsAdminApi();

    for (let i = 1; i <= amount; i++) {
      const cutomerToCreate = generateNewCustomer();
      const createdCustomer = await this.controller.create(cutomerToCreate, token);

      expect(createdCustomer.status).toBe(STATUS_CODES.CREATED);

      Customers.add(createdCustomer.body.Customer);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomers() {
    const token = await signInApiService.signInAsAdminApi();

    for (const customer of Customers.getAll()) {
      const response = await this.controller.delete(customer._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomer(email: string) {
    const token = await signInApiService.signInAsAdminApi();

    const customers = await this.controller.getAll(token);
    const customerToDelete = customers.body.Customers.find((c) => c.email === email);
    if (customerToDelete) {
      const response = await this.controller.delete(customerToDelete._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    } else {
      throw new Error(`Customer with email: '${email}' was not found`);
    }
  }
}
