import { Customers } from '../../config/environment.js';
import { DeleteModalPage } from '../pages/modals/delete.modal.page.js';
import { DetailsModalPage } from '../pages/modals/detail.modal.page.js';
import { FiltersModalPage } from '../pages/modals/filters.modal.page.js';
import _ from 'lodash';
import { SalesPortalService } from './salesPortal.service.js';

export class ModalService extends SalesPortalService {
  constructor(
    private detailsModal = new DetailsModalPage(),
    private deleteModal = new DeleteModalPage(),
    private filtersModal = new FiltersModalPage(),
  ) {
    super();
  }

  async verifyDetailsModalData(idx: number) {
    const customer = Customers.getAll()[--idx];
    const actual = await this.detailsModal.getDetailsModalData();
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
