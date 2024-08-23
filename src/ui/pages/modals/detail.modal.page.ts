import { asyncMap } from '../../../utils/async-array-methods.js';
import { BaseModalPage } from './base.modal.page.js';

export class DetailsModalPage extends BaseModalPage {
  readonly uniqueElement: string = '//h5[contains(text(), "Details")]';

  readonly 'Edit modal button' = (module: 'Customer' | 'Product') => `//button[.="Edit ${module}"]`;

  readonly 'Row values' = `//div[@class="modal-body"]//div[strong]/div`;

  readonly 'Row value by row name' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;

  readonly 'Email row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;

  readonly 'Name row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'Country row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'City row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'Street row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'House row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'Flat row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'Phone row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;
  readonly 'Notes row value' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[.="${row}:"]]/div`;

  async clickOnEditCustomerButton() {
    await this.click(this['Edit modal button']('Customer'));
  }

  async clickOnEditProductButton() {
    await this.click(this['Edit modal button']('Product'));
  }

  async getDetailsModalData() {
    const rawData = await this.waitForElementArray(this['Row values']);
    const [email, name, country, city, street, house, flat, phone, _, notes] = await asyncMap(
      [...rawData],
      async (row) => await $(row).getText(),
    );

    return {
      email,
      name,
      country,
      city,
      street,
      house: +house,
      flat: +flat,
      phone,
      notes,
    };
  }
}
