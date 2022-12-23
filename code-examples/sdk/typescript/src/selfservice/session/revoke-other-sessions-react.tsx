import { Configuration, FrontendApi } from "@ory/client"

const ory = new FrontendApi(
  new Configuration({
    basePath: "http://localhost:4000", // Use your local Ory Tunnel URL
    baseOptions: {
      withCredentials: true,
    },
  }),
)

export function RevokeOtherSessions() {
  const handleRevokeOtherSessions = async () => {
    try {
      await ory.disableMyOtherSessions()
    } catch (error) {
      // The sessions could not be revoked
      // This might occur if the current session has expired
    }

    // Sessions were revoked successfully
  }

  return (
    <button onClick={handleRevokeOtherSessions}>Revoke other sessions</button>
  )
}
