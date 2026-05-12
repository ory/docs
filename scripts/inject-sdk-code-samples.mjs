#!/usr/bin/env node
/**
 * Injects x-codeSamples (TypeScript + Go) and x-sdk-docs (structured param
 * metadata) into src/static/api.json for every operation, reading
 * pre-generated examples directly from the SDK docs.
 *
 * Run:  node scripts/inject-sdk-code-samples.mjs
 * Then: npm run docusaurus -- gen-api-docs ory
 */

import { readFileSync, writeFileSync, existsSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SPEC_PATH = join(__dirname, "../src/static/api.json")
const TS_DOCS_DIR = join(__dirname, "../../sdk/clients/client/typescript/docs")
const GO_DOCS_DIR = join(__dirname, "../../sdk/clients/client/go/docs")

// ─── Tag → SDK identifiers ───────────────────────────────────────────────────

const TAG_TO_TS_CLASS = {
  courier: "CourierApi",
  events: "EventsApi",
  frontend: "FrontendApi",
  identity: "IdentityApi",
  jwk: "JwkApi",
  metadata: "MetadataApi",
  oAuth2: "OAuth2Api",
  oidc: "OidcApi",
  permission: "PermissionApi",
  project: "ProjectApi",
  relationship: "RelationshipApi",
  wellknown: "WellknownApi",
  workspace: "WorkspaceApi",
}

const TAG_TO_GO_SERVICE = {
  courier: "CourierAPI",
  events: "EventsAPI",
  frontend: "FrontendAPI",
  identity: "IdentityAPI",
  jwk: "JwkAPI",
  metadata: "MetadataAPI",
  oAuth2: "OAuth2API",
  oidc: "OidcAPI",
  permission: "PermissionAPI",
  project: "ProjectAPI",
  relationship: "RelationshipAPI",
  wellknown: "WellknownAPI",
  workspace: "WorkspaceAPI",
}

// ─── Type helpers ─────────────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\\&#39;/g, "'")
    .replace(/&#x60;/g, "`")
    .replace(/&#x2F;/g, "/")
    .replace(/&nbsp;/g, " ")
    .replace(/&#124;/g, "|")
    .replace(/&#x7C;/g, "|")
}

function cleanTsType(raw) {
  return decodeHtmlEntities(
    raw
      .replace(/\[\*\*([^*]+)\*\*\]/g, "$1") // [**Type**] → Type
      .replace(/\*\*([^*]+)\*\*/g, "$1") // **Type** → Type
      .trim(),
  )
}

function cleanGoType(raw) {
  return decodeHtmlEntities(
    raw
      .replace(/\[\*\*([^*]+)\*\*\]\([^)]*\)/g, "$1") // [**Type**](link) → Type
      .replace(/\*\*([^*]+)\*\*/g, "$1") // **type** → type
      .trim(),
  )
}

/** Splits a markdown table into rows, skipping header and separator lines. */
function parseMdTableRows(text) {
  return text
    .split("\n")
    .filter((l) => l.includes("|") && !/^[\s|:-]+$/.test(l))
    .slice(1) // drop header row
    .map((l) =>
      l
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean),
    )
    .filter((cols) => cols.length >= 2)
}

// ─── Code example parsers ─────────────────────────────────────────────────────

function parseGoDocsExamples(docsDir, tagToService) {
  const examples = {}
  for (const serviceName of Object.values(tagToService)) {
    const filePath = join(docsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) {
      console.warn(`  WARN  Go docs not found: ${filePath}`)
      continue
    }
    const content = readFileSync(filePath, "utf8")
    for (const section of content.split(/\n## /)) {
      const heading = section.match(/^(\w+)\n/)?.[1]
      if (!heading) continue
      const code = section.match(/### Example\n\n```go\n([\s\S]*?)```/)?.[1]
      if (!code) continue
      const operationId = heading.charAt(0).toLowerCase() + heading.slice(1)
      examples[operationId] = code.trimEnd()
    }
  }
  return examples
}

function parseTsDocsExamples(docsDir, tagToService) {
  const examples = {}
  for (const serviceName of Object.values(tagToService)) {
    const filePath = join(docsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) {
      console.warn(`  WARN  TS docs not found: ${filePath}`)
      continue
    }
    const content = readFileSync(filePath, "utf8")
    for (const section of content.split(/\n# \*\*/)) {
      const heading = section.match(/^(\w+)\*\*/)?.[1]
      if (!heading) continue
      const code = section.match(
        /### Example\n\n```typescript\n([\s\S]*?)```/,
      )?.[1]
      if (!code) continue
      examples[heading] = code.trimEnd()
    }
  }
  return examples
}

// ─── Structured SDK docs (signature + params + return type) ──────────────────

function parseTsSdkDocs(docsDir, tagToService) {
  const result = {}
  for (const serviceName of Object.values(tagToService)) {
    const filePath = join(docsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) continue
    const content = readFileSync(filePath, "utf8")
    for (const section of content.split(/\n# \*\*/)) {
      const heading = section.match(/^(\w+)\*\*/)?.[1]
      if (!heading) continue

      // `> ReturnType methodName(params)` → extract `methodName(params)`
      const sigLine = section.match(/^> (.+)\n/)?.[1] ?? ""
      const sigMethod = sigLine.match(/\S+\s+(\w+\([^)]*\))/)
      const signature = sigMethod?.[1] ?? `${heading}()`

      // Parameters table (between ### Parameters and next ###)
      const paramsBlock =
        section.match(/### Parameters\n\n([\s\S]*?)(?=###|\n\n\n|$)/)?.[1] ?? ""
      const params = parseMdTableRows(paramsBlock)
        .map((cols) => {
          const notes = cols[3] ?? ""
          return {
            name: cleanTsType(cols[0] ?? ""),
            type: cleanTsType(cols[1] ?? ""),
            description: cleanTsType(cols[2] ?? ""),
            required: !notes.includes("optional"),
          }
        })
        .filter((p) => p.name)

      // Return type
      const retRaw = section.match(/### Return type\n\n([^\n]+)/)?.[1] ?? ""
      const returnType = cleanTsType(retRaw) || "void"

      result[heading] = { signature, params, returnType }
    }
  }
  return result
}

function parseGoSdkDocs(docsDir, tagToService) {
  const result = {}
  for (const serviceName of Object.values(tagToService)) {
    const filePath = join(docsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) continue
    const content = readFileSync(filePath, "utf8")
    for (const section of content.split(/\n## /)) {
      const heading = section.match(/^(\w+)\n/)?.[1]
      if (!heading) continue

      // `> ReturnType MethodName(ctx)...Execute()` → extract `MethodName(ctx)...`
      const sigLine = section.match(/^> (.+)\n/)?.[1] ?? ""
      const sigMethod = sigLine.match(/\S+\s+(\w+\(ctx\)[^\n]*)/)
      const signature = sigMethod?.[1] ?? `${heading}(ctx).Execute()`

      // Path parameters (required) — skip the `ctx` row
      const pathBlock =
        section.match(/### Path Parameters\n\n([\s\S]*?)(?=###)/)?.[1] ?? ""
      const pathParams = parseMdTableRows(pathBlock)
        .map((cols) => ({
          name: cleanGoType(cols[0] ?? ""),
          type: cleanGoType(cols[1] ?? ""),
          description: cleanGoType(cols[2] ?? ""),
          required: true,
        }))
        .filter((p) => p.name && p.name !== "ctx")

      // Builder parameters (optional)
      // The "Other Parameters" section has a prose line before the table
      const otherSection =
        section.match(/### Other Parameters\n\n([\s\S]*?)(?=###|$)/)?.[1] ?? ""
      const otherTableStart = otherSection.indexOf("\nName |")
      const otherBlock =
        otherTableStart >= 0
          ? otherSection.slice(otherTableStart)
          : otherSection
      const builderParams = parseMdTableRows(otherBlock)
        .map((cols) => ({
          name: cleanGoType(cols[0] ?? ""),
          type: cleanGoType(cols[1] ?? ""),
          description: cleanGoType(cols[2] ?? ""),
          required: false,
        }))
        .filter((p) => p.name)

      // Return type
      const retRaw = section.match(/### Return type\n\n([^\n]+)/)?.[1] ?? ""
      const returnType = cleanGoType(retRaw) || "void"

      const operationId = heading.charAt(0).toLowerCase() + heading.slice(1)
      result[operationId] = {
        signature,
        params: [...pathParams, ...builderParams],
        returnType,
      }
    }
  }
  return result
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const tsExamples = parseTsDocsExamples(TS_DOCS_DIR, TAG_TO_TS_CLASS)
  console.log(
    `TS: parsed ${Object.keys(tsExamples).length} examples from SDK docs`,
  )

  const goExamples = parseGoDocsExamples(GO_DOCS_DIR, TAG_TO_GO_SERVICE)
  console.log(
    `Go: parsed ${Object.keys(goExamples).length} examples from SDK docs`,
  )

  const tsSdkDocs = parseTsSdkDocs(TS_DOCS_DIR, TAG_TO_TS_CLASS)
  console.log(`TS: parsed ${Object.keys(tsSdkDocs).length} structured SDK docs`)

  const goSdkDocs = parseGoSdkDocs(GO_DOCS_DIR, TAG_TO_GO_SERVICE)
  console.log(`Go: parsed ${Object.keys(goSdkDocs).length} structured SDK docs`)

  const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"))
  let injected = 0,
    skipped = 0

  for (const pathItem of Object.values(spec.paths ?? {})) {
    for (const op of Object.values(pathItem)) {
      if (!op || typeof op !== "object" || !op.operationId) continue

      const tag = op.tags?.[0]
      if (!TAG_TO_TS_CLASS[tag]) {
        console.warn(`  SKIP  ${op.operationId} — unknown tag "${tag}"`)
        skipped++
        continue
      }

      const tsSnippet = tsExamples[op.operationId] ?? ""
      const goSnippet = goExamples[op.operationId] ?? ""

      if (!tsSnippet)
        console.warn(`  WARN  No TS example for ${op.operationId}`)
      if (!goSnippet)
        console.warn(`  WARN  No Go example for ${op.operationId}`)

      op["x-codeSamples"] = [
        ...(tsSnippet
          ? [{ lang: "TypeScript", label: "@ory/client", source: tsSnippet }]
          : []),
        ...(goSnippet
          ? [{ lang: "Go", label: "native", source: goSnippet }]
          : []),
      ]

      // Structured SDK docs for the language-aware left pane
      const xSdkDocs = {}
      if (tsSdkDocs[op.operationId])
        xSdkDocs["TypeScript"] = tsSdkDocs[op.operationId]
      if (goSdkDocs[op.operationId]) xSdkDocs["go"] = goSdkDocs[op.operationId]
      if (Object.keys(xSdkDocs).length) op["x-sdk-docs"] = xSdkDocs

      injected++
    }
  }

  writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n")
  console.log(`\nDone. Injected ${injected} samples, skipped ${skipped}.`)
  console.log(`Next: npm run docusaurus -- gen-api-docs ory`)
}

main()
