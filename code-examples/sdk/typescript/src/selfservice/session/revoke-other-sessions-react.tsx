import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export function revokeOtherSessions() {
  const handleRevokeOtherSessions = async () => {
    // highlight-start
    try {
      await frontend.disableMyOtherSessions()
    } catch (error) {
      // The sessions could not be revoked
      // This might occur if the current session has expired
    }
    // highlight-end

    // Sessions were revoked successfully
  }

  return (
    <button onClick={handleRevokeOtherSessions}>Revoke other sessions</button>
  )
}
