import { Configuration, FrontendApi } from "@ory/client"

const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

// Example of a modal component
export function RevokeSession(sessionId: string) {
  const handleRevokeSession = async () => {
    try {
      await ory.disableMySession({
        id: sessionId,
      })
    } catch (error) {
      // The session could not be revoked
      // This might occur if the current session has expired or if the sessionId provided was invalid
    }

    // Session was revoked successfully
  }

  return (
    <button onClick={handleRevokeSession}>Revoke Session {sessionId}</button>
  )
}
