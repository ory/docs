// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import golang from "!!raw-loader!@site/code-examples/sdk/go/selfservice/logout.go"
import native from "!!raw-loader!@site/code-examples/sdk/typescript/src/selfservice/logout/native.ts"

export const apiFlow = {
  ts: {
    label: "TypeScript",
    language: "ts",
    code: native,
  },
  go: {
    label: "Go",
    language: "go",
    code: golang,
  },
}
