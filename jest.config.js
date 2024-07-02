const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^redux/store$': '<rootDir>/src/redux/store/index.js',
    '^helper-functions/(.*)$': '<rootDir>/src/helper-functions/$1',
  },
  collectCoverageFrom: [
    'src/utils/moduleParamManager.js',
    'src/utils/DateAndTimeConverter.js',
    'src/utils/highlightText.js',
    'src/utils/formatedDays.js',
    'src/helper-functions/objectToFormData.js',
    'src/helper-functions/moduleTypes.js',
    'src/helper-functions/moduleFilter.js',
    'src/helper-functions/CardHelpers.js',
    'pages/api/health.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}'],
};

module.exports = createJestConfig(customJestConfig);
