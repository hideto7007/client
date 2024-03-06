export default {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.mjs$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts$': 'babel-jest',
  },
  // transformIgnorePatterns: [
  //   'node_modules/(?!vuetify)', // vuetifyを除外
  // ],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  "testEnvironmentOptions": {
    "customExportConditions": ["node", "node-addons"]
  },
  setupFiles: ['./test/setting/jest.setup.ts'],
};


// export default {
//   "roots": [
//     "<rootDir>/src"
//   ],
//   "testMatch": [
//     "**/__test__/**/*.+(ts|tsx|js)",
//     "**/?(*.)+(spec|test).+(ts|tsx|js)"
//   ],
//   "transform": {
//     "^.+\\.(ts|tsx)$": "ts-jest"
//   },
// };