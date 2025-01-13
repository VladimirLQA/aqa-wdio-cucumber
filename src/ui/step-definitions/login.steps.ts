import { Given, Then, When } from '@wdio/cucumber-framework';
import signInPage from '../pages/signIn.page';
import signInService from '../services/signIn.service';

Given(/^I open Sales Portal$/, async function(){
  await signInService.openSalesPortal();
});

Then(/^I should be on "Sign In" page$/, async function () {
  await signInPage.waitForPageOpened();
});

When(/^I log in as Admin$/, async function () {
  await signInService.loginAsAdmin();
});