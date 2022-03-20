import { useContext } from "react"
import { AuthContext } from "@/components/contexts"
import { AuthStates } from "@/types"
import { Session } from "@ory/client"

export const useSignIn = () => {
  const { dispatch } = useContext(AuthContext)
  return {
    signIn: (session: Session) => {
      dispatch({ type: AuthStates.SIGN_IN, payload: { session } })
    },
  }
}
