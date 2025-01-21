const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^lucide-react$': '<rootDir>/src/tests/mocks/lucide-react.js',
    '^lucide-react/dist/(.*)$': '<rootDir>/src/tests/mocks/lucide-react.js'
  }
}

module.exports = createJestConfig(customJestConfig)