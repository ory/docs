export const parseCookie = (cookieHeader: string | null): string => {
  if (!cookieHeader) return ""

  const attributeNames = new Set([
    "path",
    "max-age",
    "expires",
    "httponly",
    "samesite",
    "secure",
    "domain",
  ])

  const cookieStrings = cookieHeader.split(", ")
  const cookies: string[] = []

  for (let cookieStr of cookieStrings) {
    cookieStr = cookieStr.trim()
    // Take only the name=value part (before first semicolon)
    const nameValue = cookieStr.split(";")[0].trim()

    // Only add if it looks like a real cookie (has = sign and doesn't start with an attribute name)
    if (nameValue.includes("=")) {
      const cookieName = nameValue.split("=")[0].trim().toLowerCase()
      // Skip if it's a known attribute name
      if (!attributeNames.has(cookieName)) {
        cookies.push(nameValue)
      }
    }
  }

  return cookies.join("; ")
}
