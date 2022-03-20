import { useContext } from "react"
import { AuthContext } from "@/components/contexts"

export const useAuthState = () => {
  const { state } = useContext(AuthContext)
  return {
    state,
  }
}
