export default {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  "testEnvironmentOptions": {
    "customExportConditions": ["node", "node-addons"]
  },
  setupFiles: ['./tests/setting/jest.setup.ts'],
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
};