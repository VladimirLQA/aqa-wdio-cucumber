import { getRandromEnumValue } from '../../utils/enums/getRandomValue.js';
import { type IProduct, MANUFACTURERS } from '../types/products/product.types.js';
import { faker } from '@faker-js/faker';

export const generateNewProduct = (productData?: Partial<IProduct>) => ({
  // name: 'Test' + Date.now(),
  name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
  price: faker.number.int({ min: 1, max: 99999 }),
  amount: faker.number.int({ min: 0, max: 999 }),
  notes: faker.string.alphanumeric({ length: 250 }),
  manufacturer: getRandromEnumValue(MANUFACTURERS),
  ...productData,
});
