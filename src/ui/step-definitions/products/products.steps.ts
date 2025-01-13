import { DataTable, Then, When, After } from '@wdio/cucumber-framework';
import productsApiController from '../../../api/clients/products.controller.js';
import signInApiService from '../../../api/services/signIn/signIn-api.service.js';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import productsPageService from '../../services/products/products.service.js';
import editProductService  from '../../services/products/editProduct.service.js';
import { IProduct } from '../../../data/types/products/product.types.js';
import { STATUS_CODES } from '../../../data/types/api/api.types.js';
import { Products } from '../../../config/environment.js';
import _ from 'lodash';
import productsPage from '../../pages/products/products.page.js';
import productsApiService from '../../../api/services/products/products.api.service.js';

When(/^I create product via API$/, async function () {
  const token = await signInApiService.signInAsAdminApi();
  const productData = generateNewProduct();
  const productResponse = await productsApiController.create(productData, token);
  expect(productResponse.status).toBe(STATUS_CODES.CREATED);
  Products.add(productResponse.body.Product);
});

Then(/^I delete product via API$/, async function () {
  const product = Products.get();
  const token = (await browser.getCookies('Authorization'))[0]?.value;
  const response = await productsApiController.delete(product._id, `Bearer ${token}`);
  expect(response.status).toBe(STATUS_CODES.DELETED);
});

When(/^I open Edit Product page on "Products List" page$/, async function () {
  const createdProduct = Products.get();
  await productsPageService.openEditProductPage(createdProduct.name);
});

When(
  /^I fill product inputs on "Edit Product" page with following values:$/,
  async function (table: DataTable) {
    //rowHash - обьект
    // const userData = table.rowsHash();
    // console.log(userData);
    //hashes - массив объектов, где первая строка - ключи, и каждая следующая - значения конечного объекта
    // const userData = table.hashes();
    // console.log(userData);
    //rows - массив, состоящий из массивов, где каждый массив - значения из одной строки. Первая строка игнорируется
    // const userData = table.rows();
    // console.log(userData);
    //raw - как rows, но не игнорирует первую строку
    // const userData = table.raw();
    // console.log(userData);
    // const newProductData = generateNewProduct();
    // await editProductUIService.update(newProductData);

    const userData = table.rowsHash();
    // await editProductService.up(userData as Partial<IProduct>);

    Products.update({
      _id: Products.get()._id,
      ...userData,
      ...(userData.price && { price: +userData.price }),
      ...(userData.amount !== undefined && { amount: +userData.amount }),
    });
  },
);

Then(/^I should see updated Product in table on "Products List" page$/, async function () {
  const product = Products.get();
  await productsPageService.checkProductInTable(product);
});

After(async function () {
  const products = Products.getAll();
  if (products.length) {
    const token = (await browser.getCookies('Authorization'))[0]?.value;
    for (const product of products) {
      const response = await productsApiController.delete(product._id, `Bearer ${token}`);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }
});
When(/^I open "Add New Product" page$/, async function () {
  await productsPageService.openAddNewProductPage();
});

Then(/^I should see product with name "([^"]*)" in table on "Products" page$/, async function (productName: string) {
  const product = await productsPage.getProductFromTable(productName);
  expect(product.name).toBe(productName);
});

Then(/^I should see created product in table on "Products" page$/, async function () {
  const createdProduct = this.createdProduct;
  const product = await productsPage.getProductFromTable(createdProduct.name);
  expect(product).toMatchObject(_.pick(createdProduct, ['name', 'price', 'manufacturer']));
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

After(async function () {
  if (this.createdProduct) {
    const token = signInApiService.getToken();
    await productsApiService.delete(token, this.createdProduct._id);
  }
});
