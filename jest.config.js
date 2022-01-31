module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'entities',
    'dto',
    '.module.ts',
    '<rootDir>/main.ts',
    '.mock.ts',
    '<rootDir>/prisma',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    'test/(.*)': '<rootDir>/../test/$1',
    '^src/(.*)$': '<rootDir>/$1',
  },
};
