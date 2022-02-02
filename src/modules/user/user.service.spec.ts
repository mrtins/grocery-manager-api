import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { buildPrismaCrud } from 'test/mocks/mock-helper';
import { UserService } from './user.service';
import userStub from 'test/stubs/user';
import { NotFoundException } from '@nestjs/common';

const model = 'user';
const db = buildPrismaCrud(model, userStub);

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: db }],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(userStub[0]);
      expect(prisma[model].findUnique).toHaveBeenCalledTimes(1);
      expect(prisma[model].findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return nothing when user is not found', async () => {
      jest.spyOn(prisma[model], 'findUnique').mockResolvedValue(undefined);

      const response = await service.findOne(99);

      expect(response).toBeUndefined();
      expect(prisma[model].findUnique).toHaveBeenCalledTimes(1);
      expect(prisma[model].findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const response = await service.create(userStub[0]);

      expect(response).toBe(userStub[0]);
      expect(prisma[model].create).toHaveBeenCalledTimes(1);
      expect(prisma[model].create).toHaveBeenCalledWith({
        data: userStub[0],
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a ${model}`, async () => {
      const response = await service.update(1, userStub[0]);

      expect(response).toEqual(userStub[0]);
      expect(prisma[model].update).toHaveBeenCalledTimes(1);
      expect(prisma[model].update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: userStub[0],
      });
    });

    it(`should return NotFoundException when no ${model} is found`, async () => {
      jest.spyOn(prisma[model], 'update').mockRejectedValue(new Error());

      try {
        await service.update(99, {});
      } catch (error) {
        expect(error).toEqual(new NotFoundException());
      }

      expect(prisma[model].update).toHaveBeenCalledWith({
        where: { id: 99 },
        data: {},
      });
    });
  });
});
