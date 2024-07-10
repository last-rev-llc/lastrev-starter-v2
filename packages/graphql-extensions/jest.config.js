module.exports = {
  preset: 'jest-presets/jest/node',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};
