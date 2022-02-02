import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import categoryList from 'test/stubs/category.json';
import { buildServiceCrud } from 'test/mocks/mock-helper';

const serviceMock = buildServiceCrud(categoryList);

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const response = await controller.findAll();

      expect(service.findAll).toBeCalledTimes(1);
      expect(response).toEqual(categoryList);
    });
  });

  describe('create', () => {
    it('should create a category and return', async () => {
      const response = await controller.create(categoryList[0]);

      expect(service.create).toBeCalledWith(categoryList[0]);
      expect(response).toEqual(categoryList[0]);
    });
  });

  describe('findOne', () => {
    it('should return one category', async () => {
      const response = await controller.findOne('1');

      expect(service.findOne).toBeCalledWith(1);
      expect(response).toEqual(categoryList[0]);
    });
  });

  describe('findByUser', () => {
    it('should return categories associated with user id', async () => {
      const response = await controller.findByUser('1');

      expect(service.findByUser).toBeCalledWith(1);
      expect(response).toEqual(categoryList);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const response = await controller.update('1', categoryList[0]);

      expect(service.update).toBeCalledWith(1, categoryList[0]);
      expect(response).toEqual(categoryList[0]);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const response = await controller.remove('1');

      expect(service.remove).toBeCalledWith(1);
      expect(response).toBeUndefined();
    });
  });
});
