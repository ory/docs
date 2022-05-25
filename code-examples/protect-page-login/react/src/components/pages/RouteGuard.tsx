import { FunctionComponent } from "react"
import { Navigate } from "react-router-dom"
import { AuthStates, RouteGuardProps } from "@/types"
import { Routes } from "../router/Routes"
import { useAuthState, useSession } from "@/hooks"
import { isValidSession } from "@/helper"

export const RouteGuard: FunctionComponent<RouteGuardProps> = ({
  redirectTo = `${Routes.auth}/${Routes.login}`,
  children,
}) => {
  const { state } = useAuthState()
  const session = useSession()
  const isValid = session && isValidSession(session)
  const showProtected = state.state === AuthStates.SIGNED_IN && isValid
  return showProtected ? children : <Navigate to={redirectTo} />
}
