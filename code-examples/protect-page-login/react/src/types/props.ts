import { ReactElement } from "react"
import { UiNodeTextAttributes, UiText } from "@ory/client"
import {
  UiNodeAnchorAttributes,
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRecoveryFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
  SubmitSelfServiceVerificationFlowBody,
  UiNode,
} from "@ory/client"

export type RouteGuardProps = {
  redirectTo?: string
  children: ReactElement
}

export type MessageProps = {
  message: UiText
}

export type AuthContainerProps = {
  title?: string
  children: ReactElement[] | ReactElement
}

export type NodeAnchorProps = {
  node: UiNode
  attributes: UiNodeAnchorAttributes
}

export type NodeTextProps = {
  node: UiNode
  attributes: UiNodeTextAttributes
}

export type MessagesProps = {
  messages?: UiText[]
}

import { FormEvent } from "react"

export type ValueSetter = (
  value: string | number | boolean | undefined
) => Promise<void>

export type FormDispatcher = (e: MouseEvent | FormEvent) => Promise<void>

export type Values = Partial<
  | SubmitSelfServiceLoginFlowBody
  | SubmitSelfServiceRegistrationFlowBody
  | SubmitSelfServiceRecoveryFlowBody
  | SubmitSelfServiceSettingsFlowBody
  | SubmitSelfServiceVerificationFlowBody
>

export type Methods =
  | "oidc"
  | "password"
  | "profile"
  | "totp"
  | "webauthn"
  | "link"
  | "lookup_secret"

export type FlowProps<T> = {
  // The flow
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow
    | SelfServiceRecoveryFlow
  // Only show certain nodes. We will always render the default nodes for CSRF tokens.
  only?: Methods
  // Is triggered on submission
  onSubmit: (values: T) => Promise<void>
  // Do not show the global messages. Useful when rendering them elsewhere.
  hideGlobalMessages?: boolean
}
