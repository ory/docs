#!/usr/bin/env node
/**
 * Injects x-codeSamples (TypeScript + Go) into src/static/api.json for every
 * operation, reading pre-generated examples directly from the SDK docs.
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

// ─── SDK docs parsers ────────────────────────────────────────────────────────

/**
 * Parses Go SDK docs: sections start with `## MethodName` (PascalCase).
 */
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

/**
 * Parses TypeScript SDK docs: sections start with `# **methodName**` (camelCase).
 */
function parseTsDocsExamples(docsDir, tagToService) {
  const examples = {}
  for (const serviceName of Object.values(tagToService)) {
    const filePath = join(docsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) {
      console.warn(`  WARN  TS docs not found: ${filePath}`)
      continue
    }
    const content = readFileSync(filePath, "utf8")
    // Split on h1 bold method headings: `# **methodName**`
    for (const section of content.split(/\n# \*\*/)) {
      const heading = section.match(/^(\w+)\*\*/)?.[1]
      if (!heading) continue
      const code = section.match(
        /### Example\n\n```typescript\n([\s\S]*?)```/,
      )?.[1]
      if (!code) continue
      examples[heading] = code.trimEnd() // already camelCase
    }
  }
  return examples
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
      injected++
    }
  }

  writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n")
  console.log(`\nDone. Injected ${injected} samples, skipped ${skipped}.`)
  console.log(`Next: npm run docusaurus -- gen-api-docs ory`)
}

main()
