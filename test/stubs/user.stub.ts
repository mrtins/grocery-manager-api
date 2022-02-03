import faker from '@faker-js/faker';
import { User } from 'src/modules/user/entities/user.entity';

const userStub: User[] = [
  {
    id: 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.fake('{{name.firstName}}@gmail.com'),
  },
  {
    id: 2,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.fake('{{name.firstName}}@gmail.com'),
  },
  {
    id: 3,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.fake('{{name.firstName}}@gmail.com'),
  },
];

export default userStub;
