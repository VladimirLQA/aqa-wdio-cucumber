import type { ICustomerFromResponse } from '../../data/types/customer.types.js';

export class CustomerStorage {
  private static instance: CustomerStorage;
  private customers: ICustomerFromResponse[] = [];

  constructor() {
    if (CustomerStorage.instance) {
      return CustomerStorage.instance;
    }
    CustomerStorage.instance = this;
  }

  add(customer: ICustomerFromResponse): void {
    // const productIndex = this.findProductById(product._id);
    // if (productIndex !== -1) {
    //   this.update(product, productIndex);
    // } else {
    this.customers.push(customer);
    // }
  }

  update(customer: Pick<ICustomerFromResponse, '_id'> & Partial<ICustomerFromResponse>) {
    const index = this.findCustomerById(customer._id);
    this.customers[index] = { ...this.customers[index], ...customer };
  }

  getAll() {
    return this.customers;
  }

  get(_id?: string) {
    if (!this.customers.length) throw new Error('No stored customers');
    if (!_id) return this.customers[this.customers.length - 1];
    const index = this.findCustomerById(_id);
    if (!index) throw new Error('No such customer');
    return this.customers[index];
  }

  remove(_id: string) {
    const index = this.findCustomerById(_id);
    this.customers.splice(index, 1);
  }

  private findCustomerById(_id: string) {
    return this.customers.findIndex((p) => p._id === _id);
  }
}
