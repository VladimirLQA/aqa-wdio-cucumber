import { ICustomer } from '../../../data/types/customers/customer.types';
import customersListPage from '../../pages/customers/customers-list.page';
import _ from 'lodash';
import editCustomerPage from '../../pages/customers/editCustomer.page';
import addCustomerPage from '../../pages/customers/addNewCustomer.page';

class CustomerPageService {
  private customersPage = customersListPage;
  private editCustomerPage = editCustomerPage;
  private addCustomerPage = addCustomerPage;

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
