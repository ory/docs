import { Configuration, FrontendApi, Session } from "@ory/client"
import { useEffect, useState } from "react"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export function checkSession() {
  const [session, setSession] = useState<Session>(undefined)

  // highlight-start
  useEffect(() => {
    frontend
      // the cookie is automatically sent with the request
      .toSession()
      .then(({ data: session }) => {
        setSession(session)
      })
      .catch((error) => {
        // The session could not be fetched
        // This might occur if the current session has expired
      })
  }, [])

  // highlight-end
  return session ? (
    <table>
      <tr>
        <th>Session ID</th>
        <th>Expires at</th>
        <th>Authenticated at</th>
      </tr>
      <tr id={session.id}>
        <td>{session.id}</td>
        <td>{session.expires_at || ""}</td>
        <td>{session.authenticated_at || ""}</td>
      </tr>
    </table>
  ) : (
    <div>Loading session data...</div>
  )
}
