import {
  SubmitSelfServiceRegistrationFlowBody,
  Session,
  UiNode,
  UiNodeInputAttributes,
} from "@ory/client"
import { Dispatch, SetStateAction } from "react"
import { FormDispatcher, ValueSetter } from "./props"

export type LoginParams = {
  return_to: string
  flow: string
  refresh: string // boolean
  aal: string
}
export type RegistrationParams = {
  return_to: string
  flow: string
}

export type CustomSubmitSelfServiceRegistrationFlowBody =
  SubmitSelfServiceRegistrationFlowBody & {
    traits: {
      email: string
      name: string
    }
  }

export enum FlowType {
  login = "login",
  registration = "registration",
  settings = "settings",
  recovery = "recovery",
  verification = "verification",
}

export type FlowAction<S> = {
  setFlow: Dispatch<SetStateAction<S | undefined>>
  setErrorMessage?: Dispatch<SetStateAction<string | null>>
}

export type Flow = "login" | "settings" | "recovery" | "registration" | "verification"

export interface NodeInputProps {
  node: UiNode
  attributes: UiNodeInputAttributes
  value: any
  disabled: boolean
  dispatchSubmit: FormDispatcher
  setValue: ValueSetter
}

export enum AuthStates {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  SIGNED_IN = "SIGNED_IN",
  SIGNED_OUT = "SIGNED_OUT",
  UNKNOWN = "UNKNOWN",
}

export type AuthActions =
  | { type: "SIGN_IN"; payload: { session: Session } }
  | { type: "SIGN_OUT" }

export type AuthState =
  | {
      state: AuthStates.SIGNED_IN
      currentSession: Session
    }
  | {
      state: AuthStates.SIGNED_OUT
    }
  | {
      state: AuthStates.UNKNOWN
    }
