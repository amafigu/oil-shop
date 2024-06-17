module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Use jsdom for React testing
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "^axios$": "axios/dist/node/axios.cjs",
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/styleMock.js",
  },
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
}
