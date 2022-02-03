import faker from '@faker-js/faker';
import { Prisma, Product } from '@prisma/client';
import { generateRandomDecimal } from 'src/utils/numbers';

const productStub: Product[] = [
  {
    id: 1,
    categoryId: 1,
    sizeMeasureId: 1,
    userId: 1,
    productName: faker.lorem.words(1),
    brandName: faker.lorem.words(1),
    averagePrice: new Prisma.Decimal(generateRandomDecimal()),
  },
  {
    id: 2,
    categoryId: 1,
    sizeMeasureId: 1,
    userId: 1,
    productName: faker.lorem.words(1),
    brandName: faker.lorem.words(1),
    averagePrice: new Prisma.Decimal(generateRandomDecimal()),
  },
  {
    id: 3,
    categoryId: 1,
    sizeMeasureId: 1,
    userId: 2,
    productName: faker.lorem.words(2),
    brandName: faker.lorem.words(1),
    averagePrice: new Prisma.Decimal(generateRandomDecimal()),
  },
];

export default productStub;
