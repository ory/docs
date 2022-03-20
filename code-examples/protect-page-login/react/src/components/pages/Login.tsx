import { SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody } from "@ory/client"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { LoginParams, FlowType } from "@/types"
import { Routes } from "@/components/router/Routes"
import { useEffect, useState } from "react"
import { ory } from "@/authSetup"
import { handleFlowError } from "@/helper"
import { toast } from "react-toastify"
import { useAuthState, useSignIn, useSignOut } from "@/hooks"
import { AuthContainer } from "../container/AuthContainer"
import { Flow } from "../atoms"

export function Login() {
  const navigate = useNavigate()
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()
  const [, setSearchParams] = useSearchParams()
  const {
    return_to: returnTo,
    flow: currentFlow,
    refresh,
    aal,
  } = useParams<LoginParams>()
  const { state } = useAuthState()
  const { signOut } = useSignOut()
  const { signIn } = useSignIn()

  useEffect(() => {
    if (currentFlow) {
      console.log("flow already present in request, setting flow data...")
      ory
        .getSelfServiceLoginFlow(String(currentFlow), undefined)
        .then(({ data }) => {
          setFlow(data)
        })
        .catch(handleFlowError(navigate, FlowType.login, setFlow))
      return
    }

    console.log("Initialize new login flow...")
    ory
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined,
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log("Setting flow data...", data)
        setFlow(data)
      })
      .catch(handleFlowError(navigate, FlowType.login, setFlow))
  }, [refresh, aal, currentFlow])

  const onSubmit = (values: SubmitSelfServiceLoginFlowBody): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!flow) {
        // TODO add user error toast here
        toast.error("[DEV] There is no login flow present, aborting...")
        return reject()
      }
      setSearchParams({ flow: flow.id }, { replace: true })
      ory
        .submitSelfServiceLoginFlow(String(flow.id), undefined, values)
        // We logged in successfully! Let's bring the user home.
        .then(({ data }) => {
          console.log("successful log in")
          if (flow?.return_to) {
            console.log("set refresh params for return flow")
            setSearchParams({ return_to: flow.return_to || "" }, { replace: true })
            return
          }
          signIn(data.session)
          resolve(navigate(`${Routes.root}${Routes.loggedIn}`))
        })
        .catch(handleFlowError(navigate, FlowType.login, setFlow))
    })
  }

  const onLogout = () => {
    if (currentFlow) {
      return signOut()
    }
  }

  const getTitle = () => {
    if (flow?.refresh) {
      return "Confirm Action"
    } else if (flow?.requested_aal === "aal2") {
      return "Two-Factor Authentication"
    }
    return "Sign In"
  }

  return (
    <AuthContainer title={getTitle()}>
      <Flow onSubmit={onSubmit} flow={flow} />
      {aal || refresh ? (
        <button
          onClick={() => onLogout}
          type="button"
          className="w-full inline-flex items-center justify-center py-2 px-4 mt-4 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log out
        </button>
      ) : (
        <>
          <button
            onClick={() => navigate(`${Routes.root}/${Routes.registrationInitialize}`)}
            type="button"
            className="w-full inline-flex items-center justify-center py-2 px-4 mt-4 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create account
          </button>
          <button
            onClick={() => navigate(`${Routes.root}/${Routes.recoveryInitialize}`)}
            type="button"
            className="w-full inline-flex items-center justify-center py-2 px-4 mt-4 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Recover your account
          </button>
        </>
      )}
    </AuthContainer>
  )
}
