module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
