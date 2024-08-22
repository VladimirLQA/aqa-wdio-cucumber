const TIMEOUT_5_SECS = 5000;

export abstract class BasePage {
  private async findElement(locator: string) {
    return await $(locator);
  }

  private async findElementArray(locator: string) {
    return await $$(locator);
  }

  public async waitForElement(locator: string, timeout = TIMEOUT_5_SECS, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }

  public async waitForElementArray(locator: string, timeout = TIMEOUT_5_SECS, reverse = false) {
    const elements = await this.findElementArray(locator);
    // await element.waitForDisplayed({ timeout, reverse });
    return elements;
  }

  public async click(locator: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  async setValue(locator: string, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  async getText(locator: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  async selectDropdownValue(
    dropdownLocator: string,
    value: string | number,
    timeout = TIMEOUT_5_SECS,
  ) {
    const element = await this.waitForElement(dropdownLocator, timeout);
    await element.selectByVisibleText(value);
  }

  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }

  async getCookies(cookieNames: string[]) {
    const cookies = await browser.getCookies(cookieNames);
    const values = cookies.filter((c) => cookieNames.includes(c.name)).map((c) => c.value);
    return values;
  }
}
