// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import CodeBlockOriginal from "@theme-original/CodeBlock"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof CodeBlockOriginal>

export default function CodeBlock(props: Props): JSX.Element {
  // Enable line numbers by default unless explicitly disabled
  const showLineNumbers =
    props.showLineNumbers !== undefined
      ? props.showLineNumbers
      : true

  return <CodeBlockOriginal {...props} showLineNumbers={showLineNumbers} />
}

