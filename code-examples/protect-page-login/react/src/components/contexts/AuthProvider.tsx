import { createContext, FunctionComponent, useReducer } from "react"
import { AuthState, AuthStates, AuthActions } from "@/types"

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthStates.SIGN_IN:
      return {
        state: AuthStates.SIGNED_IN,
        currentSession: action.payload.session,
      }
    case AuthStates.SIGN_OUT:
      return {
        state: AuthStates.SIGNED_OUT,
      }
    default:
      return {
        state: AuthStates.UNKNOWN,
      }
  }
}

type AuthContextProps = {
  state: AuthState
  dispatch: (value: AuthActions) => void
}

export const AuthContext = createContext<AuthContextProps>({
  state: { state: AuthStates.UNKNOWN },
  dispatch: (_: AuthActions) => {},
})

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: AuthStates.UNKNOWN })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  )
}
