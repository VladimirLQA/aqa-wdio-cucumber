import { When, Then, After } from '@wdio/cucumber-framework';
import customersApiService from '../../../api/services/customers/customers.api.service.js';
import { Customers } from '../../../config/environment.js';
import customersPageService from '../../services/customers/customers.service.js';
import modalService from '../../services/modal.service.js';
import customersListPage from '../../pages/customers/customers-list.page.js';
import signInApiService from '../../../api/services/signIn/signIn-api.service.js';

When(/^I create "([^"]*)"? customers via API$/, async function (amount: number) {
  await customersApiService.populateCustomers(amount);
});

When(/^I create customer via API$/, async function () {
  const token = await signInApiService.signInAsAdminApi();
  const customer =  await customersApiService.create(token);
  this.createdCustomer = customer;
});

Then(/^I should be on "Customers" page$/, async function () {
  await customersListPage.waitForPageOpened();
});

When(
  /^I open Details modal on "Customers" page for "([^"]*)" created customer/,
  async function (idx: number) {
    const customers = Customers.getAll();
    await customersPageService.openDetailsModal(customers[--idx].email);
  },
);

Then(/^I should see created Customers in table on "Customers" page$/, async function () {
  for (const c of Customers.getAll()) {
    await customersPageService.checkCustomerInTable(c);
  }
});

Then(
  /^I should see "([^"]*)" created customer data in "Details" modal$/,
  async function (idx: number) {
    await modalService.verifyDetailsModalData(idx);
  },
);

Then(/^I should delete customer with email "(.*)" via API$/, async function (email: string) {
  await customersApiService.deleteCustomerWithEmail(email);
});

After({ tags: '@cleanup' }, async function () {
  if (this.createdCustomer) {
    const token = await signInApiService.getToken();
    await customersApiService.delete(token, this.createdCustomer._id);
  }
});