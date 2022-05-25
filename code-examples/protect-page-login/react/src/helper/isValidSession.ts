import { Session } from "@ory/client"

export function isValidSession(session: Session) {
  const { active, authenticated_at, expires_at } = session

  if (!active || !authenticated_at || !expires_at) return false
  const now = Date.now()
  const expiration = Date.parse(expires_at)
  console.log(now, expiration)

  if (now >= expiration) return true
  return false
}
