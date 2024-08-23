import { When, Then, After } from '@wdio/cucumber-framework';
import { CustomersApiService } from '../../api/services/customers/customers.api.service.js';
import { Customers } from '../../config/environment.js';
import { CustomerService } from '../services/customers/customersList.service.js';
import { ModalService } from '../services/modal.service.js';

const apiService = new CustomersApiService();
const modalService = new ModalService();
const customerList = new CustomerService();

When(/^I create "([^"]*)"? customers via API$/, async function (amount: number) {
  await apiService.populateCustomers(amount);
});

Then(/I should open "([^"]*)" modal window$/, async function () {});

When(
  /^I open Details modal on "Customers List" page for "([^"]*)" created customer/,
  async function (idx: number) {
    const customers = Customers.getAll();
    await customerList.openDetailsModal(customers[--idx].email);
  },
);

Then(/^I should see created Customers in table on "Customers List" page$/, async function () {
  for (const c of Customers.getAll()) {
    await customerList.checkCustomerInTable(c);
  }
});

Then(
  /^I should see "([^"]*)" created customer data in "Details" modal$/,
  async function (idx: number) {
    await modalService.verifyDetailsModalData(idx);
  },
);

After(async function () {
  await apiService.deleteCreatedCustomers();
});
