import { getRandromEnumValue } from '../../utils/enums/getRandomValue.js';
import { type IProduct, MANUFACTURERS } from '../types/product.types.js';
import { faker } from '@faker-js/faker';

export function generateNewProduct(productData?: Partial<IProduct>) {
  const productToCreate: IProduct = {
    // name: 'Test' + Date.now(),
    name: faker.commerce.product() + faker.number.int({ min: 1, max: 100000 }),
    price: faker.number.int({ min: 1, max: 99999 }),
    amount: faker.number.int({ min: 0, max: 999 }),
    notes: 'Test notes',
    manufacturer: getRandromEnumValue(MANUFACTURERS),
    ...productData,
  };
  return productToCreate;
}
