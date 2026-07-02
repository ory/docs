/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react"

import { useDoc } from "@docusaurus/plugin-content-docs/client"
import CodeSnippets from "@theme/ApiExplorer/CodeSnippets"
import Request from "@theme/ApiExplorer/Request"
import Response from "@theme/ApiExplorer/Response"
import SecuritySchemes from "@theme/ApiExplorer/SecuritySchemes"
import type { ApiItem } from "docusaurus-plugin-openapi-docs/src/types"
import * as sdk from "postman-collection"

function ApiExplorer({
  item,
  infoPath,
  showRequestResponse = true,
}: {
  item: NonNullable<ApiItem>
  infoPath: string
  // When false, only the code samples render — the authorization / request /
  // response "try it" panels are hidden. The SDK reference uses this to keep
  // just the language tabs + code sample for SDK languages (TypeScript, Go,
  // Python) and show the full HTTP explorer only when curl is selected.
  showRequestResponse?: boolean
}) {
  const metadata = useDoc()
  const { mask_credentials } = metadata.frontMatter

  const postman = new sdk.Request(
    item.postman
      ? sdk.Request.isRequest(item.postman)
        ? (item.postman as any).toJSON()
        : (item.postman as any)
      : {},
  )

  return (
    <>
      {showRequestResponse && <SecuritySchemes infoPath={infoPath} />}
      {item.method !== "event" && (
        <CodeSnippets
          postman={postman}
          codeSamples={(item as any)["x-codeSamples"] ?? []}
          maskCredentials={mask_credentials}
          requestBody={item.requestBody}
        />
      )}
      {showRequestResponse && (
        <>
          <Request item={item} />
          <Response item={item} />
        </>
      )}
    </>
  )
}

export default ApiExplorer
