import { Given, Then, When } from '@wdio/cucumber-framework';
import pages from '../pages/pageFactory';

Given('I open {string} url', async function (url: string) {
  await browser.maximizeWindow();
  await browser.url(url);
});

When(
  /^I enter "([^"]*)" in "([^"]*)" on "([^"]*)" page$/,
  async function (text: string, element: string, page: string) {
    await pages[page].setValue(pages[page][element], text);
  },
);

When(
  /^I select "([^"]*)" in "([^"]*)" on "([^"]*)" page$/,
  async function (text: string, element: string, page: string) {
    await pages[page].selectDropdownValue(pages[page][element], text);
  },
);

When(/^I click on "([^"]*)" on "([^"]*)" page$/, async function (element: string, page: string) {
  await pages[page].click(pages[page][element]);
});

Then(
  /^I should( not)? see "([^"]*)" on "([^"]*)" page$/,
  async function (not: string, element: string, page: string) {
    not
      ? await pages[page].waitForElement(pages[page][element], { reverse: true })
      : await pages[page].waitForElement(pages[page][element]);
  },
);

Then(
  /^I should( not)? see "([^"]*)" (with|contains) text "([^"]*)"( on "([^"]*)" on modal)? on "([^"]*)" page$/,
  async function (
    not: string, element: string,
    compareMethod: string, text: string, modal: string, page: string
  ) {
    const actualText = modal
      ? await pages[page].getText(pages[page][modal][element])
      : await pages[page].getText(pages[page][element]);
    if (not) {
      compareMethod === 'contains' ? expect(actualText).not.toContain(text) : expect(actualText).not.toBe(text);
    } else {
      compareMethod === 'contains' ? expect(actualText).toContain(text) : expect(actualText).toBe(text);
    }
  }
);

Then(
  /^I should see notification (with|contains) text "([^"]*)" on "([^"]*)" page$/,
  async function (method: string, message: string, page: string) {
    const notification = await pages[page].getNotificationByText(message, method);
    const actualMessage = await pages[page].getText(notification);
    expect(actualMessage).toBe(message);
  }
);

// Then(/^I should be on "([^"]*)" page$/, async function (page: string) {
//   await pages[page].waitForSpinnersToBeHidden();
//   await pages[page].waitForPageOpened();
// });

Then(/^I wait for "(.*)" seconds$/, async function (delay: number) {
  await browser.pause(delay * 1000);
});
