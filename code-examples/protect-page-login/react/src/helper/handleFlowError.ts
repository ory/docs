import { Routes } from "@/components/router/Routes"
import { AxiosError } from "axios"
import { NavigateFunction } from "react-router-dom"
import { toast } from "react-toastify"
import { Flow } from "@/types"
import { Dispatch, SetStateAction } from "react"

export function handleFlowError<S>(
  navigate: NavigateFunction,
  flowType: Flow,
  setFlow: Dispatch<SetStateAction<S | undefined>>
) {
  return (error: AxiosError) => {
    console.log("Running into error flow")
    switch (error.response?.data.error?.id) {
      case "session_aal2_required":
        // 2FA is enabled and enforced, but user did not perform 2fa yet!
        window.location.href = error.response?.data.redirect_browser_to
        return
      case "session_already_available":
        // User is already signed in, let's redirect them home!
        navigate(`${Routes.root}${Routes.loggedIn}`)
        return
      case "session_refresh_required":
        // We need to re-authenticate to perform this action
        window.location.href = error.response?.data.redirect_browser_to
        return
      case "self_service_flow_return_to_forbidden":
        // The flow expired, let's request a new one.
        toast.error("The callback url adress is forbidden. Please try again.")
        setFlow(undefined)
        navigate(`${Routes.root}/${Routes[flowType]}`)
        return
      case "self_service_flow_expired":
        // The flow expired, let's request a new one.
        toast.error("Your interaction expired, please fill out the form again.")
        setFlow(undefined)
        navigate(`${Routes.root}/${Routes[flowType]}`)
        return
      case "security_csrf_violation":
        // A CSRF violation occurred. Best to just refresh the flow!
        toast.error(
          "A security violation was detected, please fill out the form again."
        )
        setFlow(undefined)
        navigate(`${Routes.root}/${Routes[flowType]}`)
        return
      case "security_identity_mismatch":
        // The requested item was intended for someone else. Let's request a new flow...
        setFlow(undefined)
        navigate(`${Routes.root}/${Routes[flowType]}`)
        return
      case "browser_location_change_required":
        // Ory Kratos asked us to point the user to this URL.
        window.location.href = error.response.data.redirect_browser_to
        return
    }

    switch (error.response?.status) {
      case 400:
        const [message] = error.response?.data.ui?.messages
        if (!message) return
        toast.error(message.text)
        return
      case 410:
        // The flow expired, let's request a new one.
        setFlow(undefined)
        navigate(`${Routes.root}/${Routes[flowType]}`)
        return
    }

    // We are not able to handle the error? Return it.
    return Promise.reject(error)
  }
}
