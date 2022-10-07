// Copyright © 2022 Ory Corp

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.[jt]sx?$": "@swc/jest",
  },
  testTimeout: 30000,
}
