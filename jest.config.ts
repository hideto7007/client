export default {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['vue', 'js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};