import { DeleteModalPage } from '../pages/modals/delete.modal.page';
import { DetailsModalPage } from '../pages/modals/detail.modal.page';
import { FiltersModalPage } from '../pages/modals/filters.modal.page';

export class ModalService {
  constructor(
    private detailsModal = new DetailsModalPage(),
    private deleteModal = new DeleteModalPage(),
    private filtersModal = new FiltersModalPage(),
  ) {}

  async getDetailsModalData() {
    const data = await this.detailsModal.getDetailData();
    return data;
  }
}
