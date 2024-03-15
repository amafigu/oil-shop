module.export = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnviroment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^#(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/styleMock.js",
  },
}
