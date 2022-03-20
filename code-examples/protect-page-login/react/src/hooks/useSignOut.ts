import { useContext } from "react"
import { AuthContext } from "@/components/contexts"
import { AuthStates } from "@/types"
import { ory } from "@/authSetup"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

export const useSignOut = () => {
  const { dispatch } = useContext(AuthContext)
  return {
    signOut: () => {
      ory
        .createSelfServiceLogoutFlowUrlForBrowsers()
        .then(({ data }) => {
          console.log("Submit logout flow", data)
          ory.submitSelfServiceLogoutFlow(data.logout_token)
          // todo handle errors
          dispatch({ type: AuthStates.SIGN_OUT })
          return
        })
        .catch((error: AxiosError) => {
          toast.error(`We didn't get a logout token. Please try again.`)
          switch (error.response?.status) {
            case 401:
              // do nothing, the session is not logged in
              console.log("401")
          }
          dispatch({ type: AuthStates.SIGN_OUT })
          console.log("General logout error", error)
          return
        })
    },
  }
}
