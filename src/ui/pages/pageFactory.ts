import { AddNewCustomerPage } from './customers/addNewCustomer.page.js';
import { CustomersListPage } from './customers/customers-list.page.js';
import { HomePage } from './home.page.js';
import { AddNewProductPage } from './products/addNewProduct.page.js';
import { EditProductPage } from './products/editProduct.page.js';
import { ProductsPage } from './products/products.page.js';
import { SignInPage } from './signIn.page.js';

const pages = {
  'Sign In': new SignInPage(),
  Home: new HomePage(),
  'Products List': new ProductsPage(),
  'Add New Product': new AddNewProductPage(),
  'Edit Product': new EditProductPage(),
  'Customers List': new CustomersListPage(),
  'Add New Customer': new AddNewCustomerPage(),
};

export default pages;
