import { Then, When } from '@wdio/cucumber-framework';
import homeService from '../services/home.service.js';
import homePage from '../pages/home.page.js';

Then(/^I should be on "Home" page$/, async function () {
  await homePage.waitForPageOpened();
});

When(
  /^I open (Products|Customers|Orders) List page on "Home" page$/,
  async function (module: string) {
    if (module === 'Products') await homeService.openProductsPage();
    if (module === 'Customers') await homeService.openCustomersPage();
  },
);
