import { Test, TestingModule } from '@nestjs/testing';
import { buildServiceCrud } from 'test/mocks/mock-helper';
import userStub from 'test/stubs/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const model = 'user';
const serviceMock = buildServiceCrud(userStub);

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it(`should create a ${model} and return`, async () => {
      const response = await controller.create(userStub[0]);

      expect(service.create).toBeCalledWith(userStub[0]);
      expect(response).toEqual(userStub[0]);
    });
  });

  describe('findOne', () => {
    it(`should return one ${model}`, async () => {
      const response = await controller.findOne('1');

      expect(service.findOne).toBeCalledWith(1);
      expect(response).toEqual(userStub[0]);
    });
  });

  describe('update', () => {
    it(`should update a ${model}`, async () => {
      const response = await controller.update('1', userStub[0]);

      expect(service.update).toBeCalledWith(1, userStub[0]);
      expect(response).toEqual(userStub[0]);
    });
  });
});
