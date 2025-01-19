import { Then, When, After } from '@wdio/cucumber-framework';
import productsApiController from '../../../api/clients/products.controller';
import signInApiService from '../../../api/services/signIn/signIn-api.service';
import { STATUS_CODES } from '../../../data/types/api/api.types';
import { Products } from '../../../config/environment';
import productsPage from '../../pages/products/products.page';
import productsApiService from '../../../api/services/products/products.api.service';
import productsPageService from '../../services/products/products.service';

Then(/^I delete product via API$/, async function () {
  const product = Products.get();
  const token = (await browser.getCookies('Authorization'))[0]?.value;
  const response = await productsApiController.delete(product._id, `Bearer ${token}`);
  expect(response.status).toBe(STATUS_CODES.DELETED);
});

When(/^I open "Add New Product" page$/, async function () {
  await productsPageService.openAddNewProductPage();
});

Then(/^I should see product with name "([^"]*)" in table on "Products" page$/, async function (productName: string) {
  const product = await productsPage.getProductFromTable(productName);
  expect(product.name).toBe(productName);
});

When(/^I create product via API$/, async function () {
  const token = await signInApiService.signInAsAdminApi();
  const createdProduct = await productsApiService.create(token);
  this.createdProduct = createdProduct;
});

When(/^I open "Edit Product" page for created product on "Products" page$/, async function () {
  const createdProduct = this.createdProduct;
  await productsPageService.openEditProductPage(createdProduct.name);
});

Then(/^I delete product with name "([^"]*)" via API$/, async function(name: string) {
  await productsApiService.deleteProductWithName(name);
});

After({ tags: '@cleanup' }, async function () {
  if (this.createdProduct) {
    const token = signInApiService.getToken();
    await productsApiService.delete(token, this.createdProduct._id);
  }
});
