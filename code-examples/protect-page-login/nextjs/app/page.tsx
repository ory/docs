"use client"

import { useEffect, useState } from "react"
import { FrontendApi, Configuration, Session } from "@ory/client-fetch"

const basePath = process.env.NEXT_PUBLIC_ORY_SDK_URL || "http://localhost:4000"
const ory = new FrontendApi(
  new Configuration({
    basePath,
    credentials: "include",
  }),
)

export default function Page() {
  // highlight-start
  const [session, setSession] = useState<Session | null>(null)
  const [logoutUrl, setLogoutUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check if the user is authenticated
    const checkSession = async () => {
      try {
        const session = await ory.toSession()
        setSession(session)

        // Get the logout URL once we have a session
        try {
          const { logout_url } = await ory.createBrowserLogoutFlow()
          setLogoutUrl(logout_url)
        } catch (logoutError) {
          console.error("Error creating logout flow:", logoutError)
        }
      } catch (error) {
        // No valid session found, redirect to Ory login
        window.location.href = `${basePath}/ui/login`
      }
    }

    checkSession()
  }, [])
  // highlight-end

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome to Protected Page</h1>

          {/* highlight-start */}
          {/* Logout button */}
          {logoutUrl && (
            <a
              href={logoutUrl}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </a>
          )}
          {/* highlight-end */}
        </div>

        <div className="p-4 rounded-lg overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Session Information:</h2>
          <pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
        </div>
      </div>
    </main>
  )
}
