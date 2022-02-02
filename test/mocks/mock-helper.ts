/* Returns mock object with basic Prisma methods for injection on services tests */
export const buildPrismaCrud = (model: string, stubDataList: any[]) => {
  const mock = {};

  mock[model] = {
    findMany: jest.fn().mockResolvedValue(stubDataList),
    findUnique: jest.fn().mockResolvedValue(stubDataList[0]),
    create: jest.fn().mockReturnValue(stubDataList[0]),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(stubDataList[0]),
    delete: jest.fn(),
  };

  return mock;
};

/* Returns mock object with basic service methods for injection on controllers tests */
export const buildServiceCrud = (stubDataList: any[]) => {
  return {
    findAll: jest.fn().mockResolvedValue(stubDataList),
    findOne: jest.fn().mockReturnValue(stubDataList[0]),
    findByUser: jest.fn().mockReturnValue(stubDataList),
    create: jest.fn().mockReturnValue(stubDataList[0]),
    update: jest.fn().mockReturnValue(stubDataList[0]),
    remove: jest.fn(),
  };
};
