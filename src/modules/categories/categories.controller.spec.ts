import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, PrismaService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [
        {
          id: 1,
          userId: 1,
          categoryName: 'Talho',
          description: 'Carnes em geral',
        },
      ];

      prisma.category.findMany = jest.fn().mockReturnValueOnce(result);

      expect(await controller.findAll()).toBe(result);
      expect(prisma.category.findMany).toHaveBeenCalledTimes(1);
    });
  });
});
