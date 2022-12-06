// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import goAPIExample from "!!raw-loader!@site/code-examples/sdk/go/selfservice/logout.go"
import tsAPIExample from "!!raw-loader!@site/code-examples/sdk/typescript/src/selfservice/logout.ts"

export const apiFlow = {
  ts: {
    label: "TypeScript",
    language: "ts",
    code: tsAPIExample,
  },
  go: {
    label: "Go",
    language: "go",
    code: goAPIExample,
  },
}
export const browserFlow = {
  node: {
    label: "TypeScript",
    language: "ts",
    code: require("raw-loader!./samples/browser/node.txt").default,
  },
}

export const spaFlow = {
  react: {
    label: "React",
    language: "tsx",
    code: require("raw-loader!./samples/spa/react.txt").default,
  },
}
