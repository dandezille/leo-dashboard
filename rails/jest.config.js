module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['app/javascript'],
  setupFilesAfterEnv: ['./app/javascript/tests/setup.ts'],
};
