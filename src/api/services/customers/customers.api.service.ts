import { Customers } from '../../../config/environment.js';
import { generateNewCustomer } from '../../../data/customers/generateCustomer.js';
import { customerSchema } from '../../../data/schemas/customer.schema.js';
import { STATUS_CODES } from '../../../data/types/api/api.types.js';
import { ICustomer, ICustomerFromResponse } from '../../../data/types/customers/customer.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { validateResponse, validateSchema } from '../../../utils/validation/response.js';
import CustomersController from '../../clients/customers.controller.js';
import signInApiService from '../signIn/signIn-api.service.js';

class CustomersApiService {
  private createdCustomers: ICustomerFromResponse[] = [];
  constructor(private controller = CustomersController) {}

  @logStep('Create customer')
  async create(token: string, customData?: Partial<ICustomer>) {
    const response = await this.controller.create(generateNewCustomer(customData), token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateSchema(response, customerSchema);
    this.createdCustomers.push(response.body.Customer);
    return response.body.Customer;
  }

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

  async delete(token: string, id?: string) {
    if (id) {
      const response = await this.controller.delete(id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
      return;
    }

    for (const customer of this.createdCustomers) {
      const response = await this.controller.delete(customer._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
    this.createdCustomers = [];
  }

  @logStep('Create {amount} customers')
  async deleteCreatedCustomers() {
    const token = await signInApiService.signInAsAdminApi();

    for (const customer of Customers.getAll()) {
      const response = await this.controller.delete(customer._id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }

  @logStep('Delete customer with {email}')
  async deleteCustomerWithEmail(token: string, email?: string) {
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

export default new CustomersApiService();
