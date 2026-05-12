#!/usr/bin/env node
/**
 * Injects x-codeSamples (TypeScript + Go) into src/static/api.json for every
 * operation, reading exact types from the generated SDK clients.
 *
 * Run:  node scripts/inject-sdk-code-samples.mjs
 * Then: npm run docusaurus -- gen-api-docs ory
 */

import { readFileSync, writeFileSync, readdirSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SPEC_PATH       = join(__dirname, "../src/static/api.json")
const TS_API_PATH     = join(__dirname, "../../sdk/clients/client/typescript/api.ts")
const GO_SDK_DIR      = join(__dirname, "../../sdk/clients/client/go")

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

// ─── Go parsing ───────────────────────────────────────────────────────────────

function parseGoSdk(goDir) {
  const serviceMethods = {}  // operationId → { serviceName, methodName, pathParams, requestType }
  const requestSetters = {}  // requestTypeName → [{ setterName, paramName, paramType }]

  for (const file of readdirSync(goDir)) {
    if (!file.startsWith("api_") || !file.endsWith(".go")) continue
    const content = readFileSync(join(goDir, file), "utf8")

    // Service entry-point methods
    const methodRe = /^func \(a \*(\w+APIService)\) (\w+)\(ctx context\.Context(.*?)\) (\w+) \{/gm
    let m
    while ((m = methodRe.exec(content)) !== null) {
      const serviceStruct = m[1]
      const methodName    = m[2]
      const paramsStr     = m[3]
      const returnType    = m[4]
      if (methodName.endsWith("Execute") || !returnType.endsWith("Request")) continue

      const serviceName = serviceStruct.replace("Service", "")
      const operationId = methodName.charAt(0).toLowerCase() + methodName.slice(1)
      serviceMethods[operationId] = {
        serviceName,
        methodName,
        pathParams: parseGoPathParams(paramsStr),
        requestType: returnType,
      }
    }

    // Setter methods on request objects
    const setterRe = /^func \(r (\w+Request)\) (\w+)\((\w+) ([^)]+)\) \w+Request \{/gm
    while ((m = setterRe.exec(content)) !== null) {
      const requestType = m[1]
      const setterName  = m[2]
      const paramName   = m[3]
      const paramType   = m[4].trim()
      if (setterName === "Execute") continue
      if (!requestSetters[requestType]) requestSetters[requestType] = []
      requestSetters[requestType].push({ setterName, paramName, paramType })
    }
  }

  return { serviceMethods, requestSetters }
}

function parseGoPathParams(paramsStr) {
  // paramsStr looks like: ", id string" or ", id string, name string" or ""
  return paramsStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const parts = p.trim().split(/\s+/)
      return { name: parts[0], type: parts.slice(1).join(" ") }
    })
}

/** PascalCase a camelCase name — used to map TS field names to Go setter names */
function toPascalCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function goPlaceholder(type, name) {
  if (type === "string")  return `"<${name}>"`
  if (type === "int64" || type === "int32" || type === "float32" || type === "float64") return "0"
  if (type === "bool")    return "false"
  if (type.startsWith("[]")) return `[]ory.${type.slice(2)}{}`
  if (type.startsWith("*"))  return `ory.New${type.slice(1)}()`
  return `ory.${type}{}`
}

function generateGoSnippet(serviceField, methodName, pathParams, allSetters, requiredSetterNames) {
  const callArgs = [
    "context.Background()",
    ...pathParams.map((p) => goPlaceholder(p.type, p.name)),
  ]

  const requiredSetters = allSetters.filter((s) =>
    requiredSetterNames.has(s.setterName)
  )

  let call
  if (requiredSetters.length === 0) {
    call = `apiClient.${serviceField}.${methodName}(${callArgs.join(", ")}).Execute()`
  } else {
    const chains = requiredSetters
      .map((s) => `\t\t${s.setterName}(${goPlaceholder(s.paramType, s.paramName)})`)
      .join(".\n")
    call = `apiClient.${serviceField}.${methodName}(${callArgs.join(", ")}).\n${chains}.\n\t\tExecute()`
  }

  return [
    "package main", "",
    "import (",
    '\t"context"',
    '\t"fmt"',
    '\tory "github.com/ory/client-go"',
    ")", "",
    "func main() {",
    "\tconfiguration := ory.NewConfiguration()",
    "\tapiClient := ory.NewAPIClient(configuration)", "",
    `\tresp, r, err := ${call}`,
    "\tif err != nil {",
    "\t\tpanic(err)",
    "\t}",
    "\tfmt.Println(resp, r)",
    "}",
  ].join("\n")
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  // Parse TypeScript SDK
  const tsContent    = readFileSync(TS_API_PATH, "utf8")
  const tsInterfaces = parseTsRequestInterfaces(tsContent)
  console.log(`TS: parsed ${Object.keys(tsInterfaces).length} request interfaces`)

  // Parse Go SDK
  const { serviceMethods: goMethods, requestSetters: goSetters } = parseGoSdk(GO_SDK_DIR)
  console.log(`Go: parsed ${Object.keys(goMethods).length} service methods`)

  const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"))
  let injected = 0, skipped = 0

  for (const pathItem of Object.values(spec.paths ?? {})) {
    for (const op of Object.values(pathItem)) {
      if (!op || typeof op !== "object" || !op.operationId) continue

      const tag       = op.tags?.[0]
      const tsClass   = TAG_TO_TS_CLASS[tag]
      const goService = TAG_TO_GO_SERVICE[tag]

      if (!tsClass || !goService) {
        console.warn(`  SKIP  ${op.operationId} — unknown tag "${tag}"`)
        skipped++
        continue
      }

      // TypeScript sample
      const tsIfaceName = tsInterfaceName(tsClass, op.operationId)
      const tsFields    = tsInterfaces[tsIfaceName] ?? []
      const tsSnippet   = generateTsSnippet(tsClass, op.operationId, tsFields)

      // Go sample
      const goMethod = goMethods[op.operationId]
      let goSnippet = ""
      if (goMethod) {
        const allSetters = goSetters[goMethod.requestType] ?? []

        // Required setters = TS required fields that aren't path params
        const pathParamNames = new Set(goMethod.pathParams.map((p) => p.name))
        const requiredSetterNames = new Set(
          tsFields
            .filter((f) => !f.optional && !pathParamNames.has(f.name))
            .map((f) => toPascalCase(f.name))
        )

        goSnippet = generateGoSnippet(
          goMethod.serviceName,
          goMethod.methodName,
          goMethod.pathParams,
          allSetters,
          requiredSetterNames,
        )
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
