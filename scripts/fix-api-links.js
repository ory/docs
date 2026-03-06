const fs = require("fs")
const path = require("path")

const apiDir = path.join(__dirname, "..", "docs", "reference", "api")

const replacements = [
  [
    /\(\.\.\/self-service\/flows\/password-reset-account-recovery\)/g,
    "(../../kratos/self-service/flows/account-recovery-password-reset)",
  ],
  [
    /\(\.\.\/self-service\/flows\/account-recovery\)/g,
    "(../../kratos/self-service/flows/account-recovery-password-reset)",
  ],
  [
    /\(\.\.\/self-service\/flows\/user-settings\)/g,
    "(../../kratos/self-service/flows/user-settings)",
  ],
  [
    /"\.\.\/self-service\/flows\/password-reset-account-recovery"/g,
    '"../../kratos/self-service/flows/account-recovery-password-reset"',
  ],
  [
    /"\.\.\/self-service\/flows\/account-recovery"/g,
    '"../../kratos/self-service/flows/account-recovery-password-reset"',
  ],
  [
    /"\.\.\/self-service\/flows\/user-settings"/g,
    '"../../kratos/self-service/flows/user-settings"',
  ],
]

function getFiles(dir, exts) {
  const results = []
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (fs.statSync(full).isDirectory()) {
      results.push(...getFiles(full, exts))
    } else if (exts.some((ext) => full.endsWith(ext))) {
      results.push(full)
    }
  }
  return results
}

if (!fs.existsSync(apiDir)) {
  console.log("API docs directory not found, skipping link fixes.")
  process.exit(0)
}

const files = getFiles(apiDir, [".mdx", ".json"])
let fixedCount = 0

for (const file of files) {
  let content = fs.readFileSync(file, "utf8")
  let changed = false
  for (const [pattern, replacement] of replacements) {
    const newContent = content.replace(pattern, replacement)
    if (newContent !== content) {
      content = newContent
      changed = true
    }
  }
  if (changed) {
    fs.writeFileSync(file, content)
    fixedCount++
  }
}

console.log(`Fixed links in ${fixedCount} files.`)
