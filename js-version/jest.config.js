const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  // 新しいsetup-tests.jsのパスに更新
  setupFilesAfterEnv: ['<rootDir>/src/test/setup-tests.js'],
  testEnvironment: 'jest-environment-jsdom',
  // 既存のモジュールマッピングを維持
  moduleNameMapper: {
    '^lucide-react$': '<rootDir>/src/tests/mocks/lucide-react.js',
    '^lucide-react/dist/(.*)$': '<rootDir>/src/tests/mocks/lucide-react.js',
    // 追加のエイリアス設定（必要な場合）
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // テストファイルのパターンを追加
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js'
  ],
  // モジュールディレクトリの設定
  moduleDirectories: [
    'node_modules',
    'src'
  ]
}

module.exports = createJestConfig(customJestConfig)