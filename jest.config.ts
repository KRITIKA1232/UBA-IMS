export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true, // Shows detailed test results
    collectCoverage: true, // Collects test coverage
    coverageDirectory: 'coverage',
    testMatch: ['**/app/tests/**/*.test.ts'], // Ensures Jest picks up test files
    // collectCoverageFrom: ['app/src/helpers/helper.ts'],
    collectCoverageFrom: [
        "app/src/controllers/**/*.ts",
        "app/src/routes/**/*.ts",
        "app/src/services/server.ts",
        "app/src/helpers/**/*.ts"
    ],
  };
  