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

export function mySessions() {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    // highlight-start
    frontend
      .listMySessions({
        page: 1,
        perPage: 10,
      })
      .then((res) => {
        setSessions(res.data)
      })
      .catch((err) => {
        // Couldn't fetch active sessions
        // This might occur if the current session has expired
      })
    // highlight-end
  }, [])

  if (!sessions) {
    return "Loading"
  }

  return (
    <table>
      <tr>
        <th>Session ID</th>
        <th>Expires at</th>
        <th>Authenticated at</th>
      </tr>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <tr id={session.id} key={session.id}>
            <td>{session.id}</td>
            <td>{session.expires_at || ""}</td>
            <td>{session.authenticated_at || ""}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No active sessions.</td>
        </tr>
      )}
    </table>
  )
}
