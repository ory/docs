import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

// Example of a modal component
export function revokeSession(sessionId: string) {
  // highlight-start
  const handleRevokeSession = async () => {
    try {
      await frontend.disableMySession({
        id: sessionId,
      })
    } catch (error) {
      // The session could not be revoked
      // This might occur if the current session has expired or if the sessionId provided was invalid
    }

    // Session was revoked successfully
  }
  // highlight-end

  return (
    <button onClick={handleRevokeSession}>Revoke Session {sessionId}</button>
  )
}
