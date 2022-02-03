import faker from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { buildPrismaCrud } from 'test/mocks/mock-helper';
import categoryStub from 'test/stubs/category.json';
import { CategoriesService } from './categories.service';

const model = 'category';
const prismaMock = buildPrismaCrud(model, categoryStub);

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of ${model}`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(categoryStub);
      expect(prisma[model].findMany).toHaveBeenCalledTimes(1);
      expect(prisma[model].findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it(`should return a single ${model}`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(categoryStub[0]);
      expect(prisma[model].findUnique).toHaveBeenCalledTimes(1);
      expect(prisma[model].findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return nothing when ${model} is not found`, async () => {
      jest.spyOn(prisma[model], 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma[model].findUnique).toHaveBeenCalledTimes(1);
      expect(prisma[model].findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('findByUser', () => {
    it(`should return ${model} array from user id`, async () => {
      const userCategoriesData = [
        {
          id: 1,
          userId: 2,
          categoryName: faker.lorem.words(2),
          description: faker.lorem.words(5),
        },
        {
          id: 2,
          userId: 2,
          categoryName: faker.lorem.words(2),
          description: faker.lorem.words(5),
        },
      ];

      const userId = 2;

      jest
        .spyOn(prisma[model], 'findMany')
        .mockResolvedValue(userCategoriesData);

      const response = await service.findByUser(userId);

      expect(response).toEqual(userCategoriesData);
      expect(prisma[model].findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      });
    });

    it(`should return empty array if no ${model} found`, async () => {
      const userId = 2;

      jest.spyOn(prisma[model], 'findMany').mockResolvedValue([]);

      const response = await service.findByUser(userId);

      expect(response).toEqual([]);
      expect(prisma[model].findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      });
    });
  });

  describe('create', () => {
    it(`should create a new ${model}`, async () => {
      const response = await service.create(categoryStub[0]);

      expect(response).toBe(categoryStub[0]);
      expect(prisma[model].create).toHaveBeenCalledTimes(1);
      expect(prisma[model].create).toHaveBeenCalledWith({
        data: categoryStub[0],
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a ${model}`, async () => {
      const response = await service.update(1, categoryStub[0]);

      expect(response).toEqual(categoryStub[0]);
      expect(prisma[model].update).toHaveBeenCalledTimes(1);
      expect(prisma[model].update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: categoryStub[0],
      });
    });

    it(`should return NotFoundException when no ${model} is found`, async () => {
      const unexistingCategory = {
        id: 99,
        userId: 99,
        categoryName: faker.lorem.words(2),
        description: faker.lorem.words(5),
      };

      jest.spyOn(prisma[model], 'update').mockRejectedValue(new Error());

      try {
        await service.update(99, unexistingCategory);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma[model].update).toHaveBeenCalledWith({
        where: { id: 99 },
        data: unexistingCategory,
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete ${model} and return empty body`, async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma[model].delete).toHaveBeenCalledTimes(1);
      expect(prisma[model].delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it(`should return NotFoundException if ${model} does not exist`, async () => {
      jest.spyOn(prisma[model], 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma[model].delete).toHaveBeenCalledTimes(1);
      expect(prisma[model].delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
