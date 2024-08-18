import { Then } from "@wdio/cucumber-framework";
import { SignInPage } from "../pages/signIn.page.js";

const signInPage = new SignInPage();

// Then(/^I should be on "Sign In" page$/, async function () {
//   await signInPage.waitForOpened();
// });

// When(/^I enter "([^"]*)" in "([^"]*)" on "Sign In" page$/, async function (text: string, element: string) {
//   await signInPage.setValue(signInPage[element], text);
// });
