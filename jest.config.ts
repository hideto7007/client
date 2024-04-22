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
  setupFiles: [
    './tests/setting/jest.setup.ts',
    './tests/setting/setup.ts',
  ],
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(vuetify)/)',  // Vuetifyを除外しないように設定
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
};