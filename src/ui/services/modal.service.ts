import { Customers } from '../../config/environment.js';
import { DeleteModalPage } from '../pages/modals/delete.modal.page.js';
import { DetailsModalPage } from '../pages/modals/detail.modal.page.js';
import { FiltersModalPage } from '../pages/modals/filters.modal.page.js';
import _ from 'lodash';

export class ModalService {
  constructor(
    private detailsModal = new DetailsModalPage(),
    private deleteModal = new DeleteModalPage(),
    private filtersModal = new FiltersModalPage(),
  ) {}

  async verifyDetailsModalData(idx: number) {
    const customer = Customers.getAll()[--idx];
    console.log('expected', customer);
    const actual = await this.detailsModal.getDetailsModalData();
    console.log('actual', actual);
    const expectedCustomer = _.pick(customer, [
      'name',
      'email',
      'house',
      'street',
      'city',
      'country',
      'notes',
      'phone',
      'flat',
    ]);
    expect(actual).toMatchObject(expectedCustomer);
  }
}
