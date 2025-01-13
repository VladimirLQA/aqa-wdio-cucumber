import { Customers } from '../../config/environment.js';
import deleteModalPage from '../pages/modals/delete.modal.page.js';
import detailsModalPage from '../pages/modals/detail.modal.page.js';
import filtersModalPage from '../pages/modals/filters.modal.page.js';
import _ from 'lodash';
import { SalesPortalPageService } from './salesPortal.service.js';

class ModalService extends SalesPortalPageService {
  private detailsModal = detailsModalPage;
  private deleteModal = deleteModalPage;
  private filtersModal = filtersModalPage;

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

export default new ModalService();
