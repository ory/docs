// Decoding the gzipped OpenAPI operation frontmatter and building the Redux
// store the ApiExplorer expects.

import {
  createStoreWithState,
  createStoreWithoutState,
} from "@theme/ApiItem/store"
import { createAuth } from "@theme/ApiExplorer/Authorization/slice"
import { createPersistenceMiddleware } from "@theme/ApiExplorer/persistenceMiddleware"
import { createStorage } from "@theme/ApiExplorer/storage-utils"
import { ungzip } from "pako"

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

export function decompressApi(encoded: string): any {
  try {
    return JSON.parse(
      new TextDecoder().decode(ungzip(base64ToUint8Array(encoded))),
    )
  } catch {
    return null
  }
}

const STATUS_2XX = /^(20[0-9]|2[1-9][0-9])$/

export function buildStore(api: any, options: any) {
  const persistenceMiddleware = createPersistenceMiddleware(options)
  if (!api) return createStoreWithoutState({}, [persistenceMiddleware])

  const acceptArray = Object.entries(api.responses ?? {})
    .filter(([code]) => STATUS_2XX.test(code))
    .flatMap(([, content]: [string, any]) =>
      Object.keys(content?.content ?? {}),
    )

  const contentTypeArray = Object.keys(api.requestBody?.content ?? {})

  const params: Record<string, any[]> = {
    path: [],
    query: [],
    header: [],
    cookie: [],
  }
  for (const param of api.parameters ?? []) params[param.in]?.push(param)

  const auth = createAuth({
    security: api.security,
    securitySchemes: api.securitySchemes,
    options,
  })

  const storage = createStorage(options?.authPersistence ?? "sessionStorage")
  const storedServer = storage.getItem("server")
  const serverObject = storedServer ? JSON.parse(storedServer) : undefined

  return createStoreWithState(
    {
      accept: { value: acceptArray[0], options: acceptArray },
      contentType: { value: contentTypeArray[0], options: contentTypeArray },
      server: {
        value: serverObject?.url ? serverObject : undefined,
        options: api.servers ?? [],
      },
      response: { value: undefined },
      body: { type: "empty" },
      params,
      auth,
      schemaSelection: { selections: {} },
      encodingSelection: {},
    },
    [persistenceMiddleware],
  )
}
