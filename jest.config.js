module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  collectCoverageFrom: [
    'public/js/**/*.js',
    '!public/js/register.js', // Exclude Firebase module
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  // Coverage thresholds disabled for DOM-heavy frontend project
  // Tests focus on core business logic and calculations
};