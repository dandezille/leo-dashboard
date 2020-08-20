module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['app/javascript'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
