import faker from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import categoryStub from 'test/stubs/category.json';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from './categories.service';

const categoriesList = categoryStub;

const oneCategory = categoriesList[0];

const db = {
  category: {
    findMany: jest.fn().mockResolvedValue(categoriesList),
    findUnique: jest.fn().mockResolvedValue(oneCategory),
    create: jest.fn().mockReturnValue(oneCategory),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneCategory),
    delete: jest.fn(),
  },
};

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, { provide: PrismaService, useValue: db }],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = await service.findAll();

      expect(categories).toEqual(categoriesList);
      expect(prisma.category.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.category.findMany).toHaveBeenCalledWith(/* nothing */);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const returnedCategory = await service.findOne(1);

      expect(returnedCategory).toEqual(oneCategory);
      expect(prisma.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return nothing when category not is found', async () => {
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(undefined);

      const returnedCategory = await service.findOne(99);

      expect(returnedCategory).toBeUndefined();
      expect(prisma.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('findByUser', () => {
    it('should return categories from user id', async () => {
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
        .spyOn(prisma.category, 'findMany')
        .mockResolvedValue(userCategoriesData);

      const userCategories = await service.findByUser(userId);

      expect(userCategories).toEqual(userCategoriesData);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      });
    });

    it('should return empty array if no categories found', async () => {
      const userId = 2;

      jest.spyOn(prisma.category, 'findMany').mockResolvedValue([]);

      const userCategories = await service.findByUser(userId);

      expect(userCategories).toEqual([]);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
      });
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const newCategory = await service.create(oneCategory);

      expect(newCategory).toBe(oneCategory);
      expect(prisma.category.create).toHaveBeenCalledTimes(1);
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: oneCategory,
      });
    });
  });

  describe('updateOne', () => {
    it('should update a category', async () => {
      const updatedCategory = await service.update(1, oneCategory);

      expect(updatedCategory).toEqual(oneCategory);
      expect(prisma.category.update).toHaveBeenCalledTimes(1);
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: oneCategory,
      });
    });

    it('should return NotFoundException when no category is found', async () => {
      const unexistingCategory = {
        id: 99,
        userId: 99,
        categoryName: faker.lorem.words(2),
        description: faker.lorem.words(5),
      };

      jest.spyOn(prisma.category, 'update').mockRejectedValue(new Error());

      try {
        await service.update(99, unexistingCategory);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 99 },
        data: unexistingCategory,
      });
    });
  });

  describe('deleteOne', () => {
    it('should return empty body if item found', async () => {
      expect(await service.remove(1)).toBeUndefined();
      expect(prisma.category.delete).toHaveBeenCalledTimes(1);
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return NotFoundException if item does not exist', async () => {
      jest.spyOn(prisma.category, 'delete').mockRejectedValue(new Error());

      try {
        await service.remove(99);
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma.category.delete).toHaveBeenCalledTimes(1);
      expect(prisma.category.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});
