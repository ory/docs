import { Configuration, FrontendApi, Session } from "@ory/client"
import { useEffect, useState } from "react"
import * as SecureStore from "expo-secure-store"

const ory = new FrontendApi(
  new Configuration({
    basePath: `https://$project_slug.projects.oryapis.com`,
  }),
)

async function getSessionTokenFromStore() {
  return await SecureStore.getItemAsync("session_token")
}

export default async function SomeComponent() {
  const [session, setSession] = useState<Session | undefined>()
  const sessionToken = await getSessionTokenFromStore()

  useEffect(() => {
    if (!sessionToken) {
      return
    }

    ory
      .toSession({
        xSessionToken: sessionToken,
      })
      .then(({ data }) => setSession(data))
  }, [sessionToken])

  return <div>{session?.id}</div>
}
