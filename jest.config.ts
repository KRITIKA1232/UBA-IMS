export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true, // Shows detailed test results
    collectCoverage: true, // Collects test coverage
    coverageDirectory: 'coverage',
    testMatch: ['**/server/tests/**/*.test.ts'], // Ensures Jest picks up test files
  };
  