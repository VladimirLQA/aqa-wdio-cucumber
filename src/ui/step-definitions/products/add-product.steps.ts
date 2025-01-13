import { Then, When } from '@wdio/cucumber-framework';
import addNewProductService from '../../services/products/addNewProduct.service';
import productsPage from '../../pages/products/products.page';
import l from 'lodash';

When(/^I create new product on "Add New Product" page$/, async function() {
  this.createdProduct = await addNewProductService.populate();
});

Then(/^I should see created product in table on "Products" page$/, async function () {
  const createdProduct = this.createdProduct;
  const product = await productsPage.getProductFromTable(createdProduct.name);
  expect(product).toMatchObject(l.pick(createdProduct, ['name', 'price', 'manufacturer']));
});