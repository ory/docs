#!/usr/bin/env node

"use strict"

const fs = require("fs")
const path = require("path")
const axios = require("axios")

const CONSOLE_HOST = "console.ory.com" // target domain to validate
const LEGACY_HOST = "console.ory.sh" // old domain — any match is an error

const SCAN_EXTENSIONS = new Set([".mdx", ".md", ".tsx", ".ts", ".jsx", ".js"])
const SKIP_DIRS = new Set([
  "node_modules",
  ".docusaurus",
  "build",
  ".git",
  ".cache",
])
const SKIP_FILES = new Set(["README.md", "console-link.tsx"])
const ROOT_DIR = path.resolve(__dirname, "../..")
const CONCURRENCY = 5
const TIMEOUT_MS = 10_000
const MAX_REDIRECTS = 5

// URL extraction
const URL_PATTERN = new RegExp(
  `https?://(?:${escapeRegex(CONSOLE_HOST)}|${escapeRegex(LEGACY_HOST)})[^\\s"')>\\]]*`,
  "g",
)

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function* walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walkDir(path.join(dir, entry.name))
    } else if (
      SCAN_EXTENSIONS.has(path.extname(entry.name)) &&
      !SKIP_FILES.has(entry.name)
    ) {
      yield path.join(dir, entry.name)
    }
  }
}

function extractUrls(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content.split("\n")
  const results = []
  for (let i = 0; i < lines.length; i++) {
    URL_PATTERN.lastIndex = 0
    let m
    while ((m = URL_PATTERN.exec(lines[i])) !== null) {
      results.push({ url: m[0], line: i + 1 })
    }
  }
  return results
}

async function httpHead(url) {
  try {
    const res = await axios.head(url, {
      timeout: TIMEOUT_MS,
      maxRedirects: MAX_REDIRECTS,
      validateStatus: () => true,
      headers: { "User-Agent": "ory-docs-link-checker/1.0" },
    })
    return { status: res.status, error: null }
  } catch (err) {
    const reason = err.code === "ECONNABORTED" ? "timeout" : err.message
    return { status: null, error: reason }
  }
}

// ── Concurrency pool ──────────────────────────────────────────────────────────
async function runWithConcurrency(tasks, limit) {
  const results = new Array(tasks.length)
  let next = 0
  async function worker() {
    while (next < tasks.length) {
      const idx = next++
      results[idx] = await tasks[idx]()
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))
  return results
}

async function main() {
  const allMatches = []
  for (const filePath of walkDir(ROOT_DIR)) {
    const relPath = path.relative(ROOT_DIR, filePath)
    for (const match of extractUrls(filePath)) {
      allMatches.push({ ...match, file: relPath })
    }
  }

  const legacyMatches = allMatches.filter((m) => m.url.includes(LEGACY_HOST))
  const currentMatches = allMatches.filter((m) => m.url.includes(CONSOLE_HOST))
  const uniqueUrls = [...new Set(currentMatches.map((m) => m.url))]

  console.log(`\nRoot: ${ROOT_DIR}`)
  console.log(
    `Found ${allMatches.length} console link(s) across ${new Set(allMatches.map((m) => m.file)).size} file(s)`,
  )
  console.log(
    `  ${legacyMatches.length} legacy (${LEGACY_HOST}) -- should be 0`,
  )
  console.log(
    `  ${currentMatches.length} current (${CONSOLE_HOST}) -- ${uniqueUrls.length} unique URL(s) to check\n`,
  )

  if (legacyMatches.length > 0) {
    console.error(
      `[ERROR] Legacy links found (migrate these to ${CONSOLE_HOST}):`,
    )
    for (const m of legacyMatches) {
      console.error(`   ${m.file}:${m.line}  ${m.url}`)
    }
    console.error("")
  }

  const statusMap = {}
  const tasks = uniqueUrls.map((url) => async () => {
    process.stdout.write(`Checking ${url} ... `)
    const result = await httpHead(url)
    statusMap[url] = result
    if (result.error) {
      console.log(`[WARN] ${result.error}`)
    } else if (result.status === 404) {
      console.log(`[ERROR] 404`)
    } else {
      console.log(`[OK] ${result.status}`)
    }
  })

  await runWithConcurrency(tasks, CONCURRENCY)

  const broken = currentMatches.filter((m) => statusMap[m.url]?.status === 404)
  const warnings = [
    ...new Map(
      currentMatches
        .filter((m) => statusMap[m.url]?.error)
        .map((m) => [m.url, m]),
    ).values(),
  ]

  if (broken.length > 0) {
    console.error("\n[ERROR] 404 links:")
    for (const m of broken) {
      console.error(`   ${m.file}:${m.line}  ${m.url}`)
    }
  }

  if (warnings.length > 0) {
    console.warn("\n[WARN] Unreachable (network/timeout -- may be transient):")
    for (const m of warnings) {
      console.warn(`   ${m.url}  (${statusMap[m.url].error})`)
    }
  }

  const hasErrors = legacyMatches.length > 0 || broken.length > 0
  console.log(
    `\n${hasErrors ? "[FAIL]" : "[PASS]"} Done -- ${legacyMatches.length} legacy link(s), ${broken.length} 404(s), ${warnings.length} warning(s)`,
  )

  if (hasErrors) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
