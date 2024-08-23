import { ICustomer } from '../../../data/types/customer.types.js';
import { CustomersListPage } from '../../pages/customers/customers-list.page.js';
import _ from 'lodash';

export class CustomerService {
  constructor(private customerListPage = new CustomersListPage()) {}

  async openEditModal(email: string) {
    await this.customerListPage.clickOnEditCustomerButton(email);
  }

  async openDetailsModal(email: string) {
    await this.customerListPage.clickOnDetailsCustomerButton(email);
  }

  async getExistingCustomerData(email: string) {
    const createdCustomertData = await this.customerListPage.getDataByEmail(email);
    return createdCustomertData;
  }

  async checkCustomerInTable(createdCustomer: ICustomer) {
    const actualCustomer = await this.getExistingCustomerData(createdCustomer.email);
    const expectedCustomer = _.pick(createdCustomer, ['name', 'email', 'country']);
    expect(actualCustomer).toMatchObject(expectedCustomer);
  }
}
