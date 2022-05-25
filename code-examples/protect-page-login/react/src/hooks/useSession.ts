import { useContext } from "react"
import { AuthContext } from "@/components/contexts"
import { AuthStates } from "@/types"

export const useSession = () => {
  const { state } = useContext(AuthContext)
  if (state.state === AuthStates.SIGNED_IN) {
    return state.currentSession
  }
  return
}
