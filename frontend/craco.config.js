/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path")

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  jest: {
    configure: {
      preset: "ts-jest",
      testEnvironment: "jsdom",
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
    },
  },
}
