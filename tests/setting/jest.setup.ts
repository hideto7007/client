// jest.setup.js
jest.mock('../../src/router/index.ts', () => {
    const originalModule = jest.requireActual('vue-router');
    return {
      ...originalModule,
      createRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
      })
    };
  });
  