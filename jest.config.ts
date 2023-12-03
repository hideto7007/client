export default {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['vue', 'js', 'ts'],
  };
  