// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.[jt]sx?$": "@swc/jest",
  },
  testTimeout: 60000,
}
