import { useSession } from "@/components/contexts"

export function UserInformation() {
  const session = useSession()

  const date =
    session?.authenticated_at && new Date(session.authenticated_at).toLocaleString()

  return (
    <div>
      {!session && <p className="mt-2 text-sm text-red-600">No Session available</p>}
      {session && (
        <div>
          <div className="flex-1 flex flex-col p-8 items-center">
            <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gray-500">
              <span className="text-xl font-medium leading-none text-white">TU</span>
            </span>
            <h3 className="mt-6 text-gray-900 text-sm font-medium">
              {session?.identity.traits.email}
            </h3>
            <span className="text-gray-900 text-sm font-medium">
              Logged in since {date && date}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
