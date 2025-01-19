import { When, DataTable, Then } from '@wdio/cucumber-framework';
import editProductPage from '../../pages/products/editProduct.page';
import { IProduct } from '../../../data/types/products/product.types';
import editProductService from '../../services/products/editProduct.service';
import productsPage from '../../pages/products/products.page';
import l from 'lodash';

When(/^I fill product inputs on "Edit Product" page with following values:$/, async function (table: DataTable) {
  const product = table.rowsHash();
  await editProductPage.fillInputs(product);
});

When(
  /^I update product with following values:$/,
  async function (table: DataTable) {
    //rowHash - обьект
    // const userData = table.rowsHash();
    // console.log(userData);
    //hashes - массив объектов, где первая строка - ключи, и каждая следующая - значения конечного объекта
    // const userData = table.hashes();
    // console.log(userData);
    //rows - массив, состоящий из массивов, где каждый
    // массив - значения из одной строки. Первая строка игнорируется
    // const userData = table.rows();
    // console.log(userData);
    //raw - как rows, но не игнорирует первую строку
    // const userData = table.raw();
    // console.log(userData);
    // const newProductData = generateNewProduct();
    // await editProductUIService.update(newProductData);
    const userData = table.rowsHash();
    this.updatedProduct = await editProductService.updateProduct(userData as Partial<IProduct>);
  },
);

Then(/^I should see updated product in table on "Products" page$/, async function () {
  const updatedProduct = this.updatedProduct;
  const product = await productsPage.getProductFromTable(updatedProduct.name);
  expect(product).toMatchObject(l.pick(updatedProduct, ['name', 'price', 'manufacturer']));
});
