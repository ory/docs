#!/usr/bin/env node
/**
 * Injects x-codeSamples (TypeScript + Go) into src/static/api.json for every
 * operation, reading exact types from the generated SDK clients.
 *
 * Run:  node scripts/inject-sdk-code-samples.mjs
 * Then: npm run docusaurus -- gen-api-docs ory
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SPEC_PATH       = join(__dirname, "../src/static/api.json")
const TS_API_PATH     = join(__dirname, "../../sdk/clients/client/typescript/api.ts")
const GO_DOCS_DIR     = join(__dirname, "../../sdk/clients/client/go/docs")

// ─── Tag → SDK identifiers ───────────────────────────────────────────────────

const TAG_TO_TS_CLASS = {
  courier: "CourierApi",    events: "EventsApi",
  frontend: "FrontendApi",  identity: "IdentityApi",
  jwk: "JwkApi",            metadata: "MetadataApi",
  oAuth2: "OAuth2Api",      oidc: "OidcApi",
  permission: "PermissionApi", project: "ProjectApi",
  relationship: "RelationshipApi", wellknown: "WellknownApi",
  workspace: "WorkspaceApi",
}

const TAG_TO_GO_SERVICE = {
  courier: "CourierAPI",    events: "EventsAPI",
  frontend: "FrontendAPI",  identity: "IdentityAPI",
  jwk: "JwkAPI",            metadata: "MetadataAPI",
  oAuth2: "OAuth2API",      oidc: "OidcAPI",
  permission: "PermissionAPI", project: "ProjectAPI",
  relationship: "RelationshipAPI", wellknown: "WellknownAPI",
  workspace: "WorkspaceAPI",
}

// ─── TypeScript parsing ───────────────────────────────────────────────────────

const TS_PRIMITIVES = new Set([
  "string","number","boolean","any","void","null",
  "undefined","unknown","never","object",
  "Array","Record","Promise","Set","Map",
])

function parseTsRequestInterfaces(content) {
  const out = {}
  const re = /^export interface (\w+Api\w+Request) \{([\s\S]*?)^}/gm
  let m
  while ((m = re.exec(content)) !== null) {
    out[m[1]] = parseTsFields(m[2])
  }
  return out
}

function parseTsFields(body) {
  const fields = []
  const re = /\/\*\*([\s\S]*?)\*\/\s*readonly (\w+)(\?)?:\s*([^\n]+)/g
  let m
  while ((m = re.exec(body)) !== null) {
    fields.push({
      description: m[1].replace(/\s*\*\s?/g, " ").trim(),
      name: m[2],
      optional: Boolean(m[3]),
      type: m[4].trim(),
    })
  }
  return fields
}

function tsInterfaceName(className, methodName) {
  return `${className}${methodName.charAt(0).toUpperCase() + methodName.slice(1)}Request`
}

function tsImportableTypes(typeStr) {
  const names = []
  const re = /\b([A-Z][a-zA-Z0-9]*)\b/g
  let m
  while ((m = re.exec(typeStr)) !== null) {
    if (!TS_PRIMITIVES.has(m[1])) names.push(m[1])
  }
  return names
}

function tsPlaceholder(type) {
  if (type === "string")           return '"<value>"'
  if (type === "number")           return "0"
  if (type === "boolean")          return "false"
  if (type.startsWith("Array<"))   return "[]"
  return `{} as ${type}`
}

function generateTsSnippet(className, methodName, fields) {
  const required = fields.filter((f) => !f.optional)
  const imports = new Set([className, "Configuration"])
  for (const f of required) {
    for (const t of tsImportableTypes(f.type)) imports.add(t)
  }

  const importLine = `import { ${[...imports].join(", ")} } from "@ory/client"`

  let call
  if (required.length === 0) {
    call = `await apiInstance.${methodName}()`
  } else {
    const args = required.map((f) => `  ${f.name}: ${tsPlaceholder(f.type)},`).join("\n")
    call = `await apiInstance.${methodName}({\n${args}\n})`
  }

  return [
    importLine, "",
    "const configuration = new Configuration()",
    `const apiInstance = new ${className}(configuration)`, "",
    `const { status, data } = ${call}`,
  ].join("\n")
}

// ─── Go: read from pre-generated SDK docs ────────────────────────────────────

function parseGoDocsExamples(goDocsDir) {
  const examples = {}  // operationId (camelCase) → go code string

  for (const [tag, serviceName] of Object.entries(TAG_TO_GO_SERVICE)) {
    const filePath = join(goDocsDir, `${serviceName}.md`)
    if (!existsSync(filePath)) {
      console.warn(`  WARN  Go docs not found: ${filePath}`)
      continue
    }

    const content = readFileSync(filePath, "utf8")

    // Split on top-level ## headings (method sections)
    const sections = content.split(/\n## /)
    for (const section of sections) {
      const methodMatch = section.match(/^(\w+)\n/)
      if (!methodMatch) continue
      const methodName = methodMatch[1]  // PascalCase, e.g. "GetCourierMessage"

      // Find the ### Example block
      const exampleMatch = section.match(/### Example\n\n```go\n([\s\S]*?)```/)
      if (!exampleMatch) continue

      const operationId = methodName.charAt(0).toLowerCase() + methodName.slice(1)
      examples[operationId] = exampleMatch[1].trimEnd()
    }
  }

  return examples
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  // Parse TypeScript SDK
  const tsContent    = readFileSync(TS_API_PATH, "utf8")
  const tsInterfaces = parseTsRequestInterfaces(tsContent)
  console.log(`TS: parsed ${Object.keys(tsInterfaces).length} request interfaces`)

  // Parse Go SDK docs
  const goExamples = parseGoDocsExamples(GO_DOCS_DIR)
  console.log(`Go: parsed ${Object.keys(goExamples).length} examples from SDK docs`)

  const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"))
  let injected = 0, skipped = 0

  for (const pathItem of Object.values(spec.paths ?? {})) {
    for (const op of Object.values(pathItem)) {
      if (!op || typeof op !== "object" || !op.operationId) continue

      const tag     = op.tags?.[0]
      const tsClass = TAG_TO_TS_CLASS[tag]

      if (!tsClass) {
        console.warn(`  SKIP  ${op.operationId} — unknown tag "${tag}"`)
        skipped++
        continue
      }

      // TypeScript sample
      const tsIfaceName = tsInterfaceName(tsClass, op.operationId)
      const tsFields    = tsInterfaces[tsIfaceName] ?? []
      const tsSnippet   = generateTsSnippet(tsClass, op.operationId, tsFields)

      // Go sample from pre-generated SDK docs
      const goSnippet = goExamples[op.operationId] ?? ""
      if (!goSnippet) {
        console.warn(`  WARN  No Go example for ${op.operationId}`)
      }

      op["x-codeSamples"] = [
        { lang: "TypeScript", label: "@ory/client",    source: tsSnippet },
        ...(goSnippet ? [{ lang: "Go", label: "native", source: goSnippet }] : []),
      ]
      injected++
    }
  }

  writeFileSync(SPEC_PATH, JSON.stringify(spec, null, 2) + "\n")
  console.log(`\nDone. Injected ${injected} samples, skipped ${skipped}.`)
  console.log(`Next: npm run docusaurus -- gen-api-docs ory`)
}

main()
