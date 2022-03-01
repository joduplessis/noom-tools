module.exports = {
    verbose: true,
    preset: "ts-jest",
    modulePathIgnorePatterns: [".dist/"],
    snapshotSerializers: ["enzyme-to-json"],
    testEnvironment: "jest-environment-jsdom"
};
