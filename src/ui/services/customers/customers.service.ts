import { ICustomer } from '../../../data/types/customers/customer.types.js';
import customersListPage from '../../pages/customers/customers-list.page.js';
import _ from 'lodash';

class CustomerPageService {
  private customersPage = customersListPage;

  async openEditModal(email: string) {
    await this.customersPage.clickOnEditCustomerButton(email);
  }

  async openDetailsModal(email: string) {
    await this.customersPage.clickOnDetailsCustomerButton(email);
  }

  async getExistingCustomerData(email: string) {
    const createdCustomertData = await this.customersPage.getDataByEmail(email);
    return createdCustomertData;
  }

  async checkCustomerInTable(createdCustomer: ICustomer) {
    const actualCustomer = await this.getExistingCustomerData(createdCustomer.email);
    const expectedCustomer = _.pick(createdCustomer, ['name', 'email', 'country']);
    expect(actualCustomer).toMatchObject(expectedCustomer);
  }
}

export default new CustomerPageService();
