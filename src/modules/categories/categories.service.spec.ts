import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoriesService } from './categories.service';

const testTitle1 = 'Test 1';
const testDescription1 = 'Test description';
const userId = 1;

const categoriesArray = [
  {
    userId,
    categoryName: testTitle1,
    description: testDescription1,
  },
  {
    id: 2,
    userId: 1,
    categoryName: 'Talho',
    description: 'Carnes em geral',
  },
  {
    id: 3,
    userId: 1,
    categoryName: 'Mercearia',
    description: 'Gerais',
  },
];

const oneCategory = categoriesArray[0];

const db = {
  category: {
    findMany: jest.fn().mockResolvedValue(categoriesArray),
    findUnique: jest.fn().mockResolvedValue(oneCategory),
    create: jest.fn().mockReturnValue(oneCategory),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneCategory),
    delete: jest.fn().mockResolvedValue(oneCategory),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = await service.findAll();
      expect(categories).toEqual(categoriesArray);
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      expect(service.findOne(1)).resolves.toEqual(oneCategory);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      expect(
        service.create({
          userId,
          categoryName: testTitle1,
          description: testDescription1,
        }),
      ).toBe(oneCategory);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const category = await service.update(1, {
        userId,
        categoryName: testTitle1,
        description: testDescription1,
      });
      expect(category).toEqual(oneCategory);
    });
  });

  describe('deleteOne', () => {
    it('should return empty body if item found', async () => {
      expect(await service.remove(1)).toBeUndefined();
    });

    it('should return HTTP 404 if item does not exist', async () => {
      jest
        .spyOn(prisma.category, 'delete')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.remove(99)).resolves.toEqual({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });
});
