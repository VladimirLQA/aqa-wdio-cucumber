
import { When, Then } from "@wdio/cucumber-framework";
import { CustomersApiService } from "../../api/services/customers/customers.api.service.js";

const apiService = new CustomersApiService()

When(/^I create "([^"]*)"? customers via API$/, async function (amount: number) {
    await apiService.populateCustomers(amount);
});


