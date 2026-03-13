// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Ory architecture diagram presets: 7 fixed diagrams with exact node/edge positions.
 * Resolve selectedProducts to one preset; no filtering or connector logic.
 */

import { Position } from "@xyflow/react"
import type { Node, Edge } from "@xyflow/react"
import type { ProductKey } from "./welcomePage/solutionDesignTypes"

export const SCIM_STEP_INDEX = 4

export function shouldShowScimEdges(
  scimSelected: boolean,
  currentStep: number | undefined,
): boolean {
  if (!scimSelected) return false
  if (currentStep === undefined) return true
  return currentStep > SCIM_STEP_INDEX
}

export interface DiagramPreset {
  id: string
  products: ProductKey[]
  nodes: Node[]
  edges: Edge[]
}

// Preset 1: empty (no products selected)
const emptyPresetNodes: Node[] = [
  {
    id: "placeholder",
    type: "plain",
    position: { x: 200, y: 200 },
    data: { label: "Select an option below to see your solution diagram." },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const emptyPresetEdges: Edge[] = []

// Preset 2: kratos only — User → App/Backend → Kratos
const kratosPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 240 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "your-app-backend",
    type: "plain",
    position: { x: 280, y: 240 },
    data: { label: "Your App/Backend" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 240 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosPresetEdges: Edge[] = [
  {
    id: "minimal-user-app",
    source: "user",
    target: "your-app-backend",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
  },
  {
    id: "minimal-app-kratos",
    source: "your-app-backend",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / login" },
  },
]

// Preset 3: kratos + elements — User → Your App/Backend (With Ory Elements) → Kratos
const kratosElementsPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 280, y: 280 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 280 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsPresetEdges: Edge[] = [
  {
    id: "user-kratos-direct-step2",
    source: "user",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-kratos-session",
    source: "ory-elements",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
]

// Preset 2b: kratos + keto — Keto next to App/Backend
const kratosKetoPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 240 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "your-app-backend",
    type: "plain",
    position: { x: 280, y: 240 },
    data: { label: "Your App/Backend" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 540, y: 240 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 660, y: 240 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosKetoPresetEdges: Edge[] = [
  {
    id: "minimal-user-app-kk",
    source: "user",
    target: "your-app-backend",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
  },
  {
    id: "app-keto-permissions",
    source: "your-app-backend",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
  {
    id: "minimal-app-kratos-kk",
    source: "your-app-backend",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / login" },
  },
]

// Preset 3b: kratos + elements + keto — Keto next to Elements
const kratosElementsKetoPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 280, y: 280 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 540, y: 280 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 660, y: 280 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsKetoPresetEdges: Edge[] = [
  {
    id: "user-kratos-direct-kek",
    source: "user",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-kratos-session-kek",
    source: "ory-elements",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "elements-keto-permissions",
    source: "ory-elements",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
]

// Preset 4: kratos + elements + hydra
const kratosElementsHydraPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 260 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsHydraPresetEdges: Edge[] = [
  {
    id: "user-elements",
    source: "user",
    target: "ory-elements",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-hydra-request",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Request" },
  },
  {
    id: "elements-hydra-oauth",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "OAuth2 / OIDC Token" },
  },
  {
    id: "hydra-kratos-login",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "hydra-kratos-session",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "hydra-protected-direct",
    source: "ory-hydra",
    target: "ory-elements",
    sourceHandle: "out-top",
    targetHandle: "in-bottom",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
]

// Preset 4b: kratos + elements + hydra + keto — Keto next to Elements (y=260)
const kratosElementsHydraKetoPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 260 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 500, y: 260 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsHydraKetoPresetEdges: Edge[] = [
  {
    id: "user-elements-keh",
    source: "user",
    target: "ory-elements",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-keto-permissions-keh",
    source: "ory-elements",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
  {
    id: "elements-hydra-request-keh",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Request" },
  },
  {
    id: "elements-hydra-oauth-keh",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "OAuth2 / OIDC Token" },
  },
  {
    id: "hydra-kratos-login-keh",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "hydra-kratos-session-keh",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "hydra-protected-direct-keh",
    source: "ory-hydra",
    target: "ory-elements",
    sourceHandle: "out-top",
    targetHandle: "in-bottom",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
]

// Preset 5: kratos + elements + hydra + polis (5th step — SSO/SCIM)
const kratosElementsHydraPolisPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 260 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 860, y: 400 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "#f97316",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "corporate-idp",
    type: "plain",
    position: { x: 860, y: 260 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsHydraPolisPresetEdges: Edge[] = [
  {
    id: "user-elements-p5",
    source: "user",
    target: "ory-elements",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-hydra-request-p5",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Request" },
  },
  {
    id: "elements-hydra-oauth-p5",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "OAuth2 / OIDC Token" },
  },
  {
    id: "hydra-kratos-login-p5",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "hydra-kratos-session-p5",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "hydra-protected-direct-p5",
    source: "ory-hydra",
    target: "ory-elements",
    sourceHandle: "out-top",
    targetHandle: "in-bottom",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
  {
    id: "idp-polis-saml-p5",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "idp-polis-scim-p5",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom-2",
    targetHandle: "in-top-2",
    type: "smoothstep-dashed",
    data: { label: "SAML / Assertion" },
  },
  {
    id: "polis-kratos-sso-p5",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left",
    targetHandle: "in-right",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "polis-kratos-identity-p5",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left-2",
    targetHandle: "in-right-2",
    type: "smoothstep-dashed",
    data: { label: "SSO" },
  },
]

// Preset 5b: kratos + elements + hydra + polis + keto — Keto next to Elements
const kratosElementsHydraPolisKetoPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 260 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 500, y: 260 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 860, y: 400 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "#f97316",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "corporate-idp",
    type: "plain",
    position: { x: 860, y: 260 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosElementsHydraPolisKetoPresetEdges: Edge[] = [
  {
    id: "user-elements-p5k",
    source: "user",
    target: "ory-elements",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "elements-keto-permissions-p5k",
    source: "ory-elements",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
  {
    id: "elements-hydra-request-p5k",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Request" },
  },
  {
    id: "elements-hydra-oauth-p5k",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "OAuth2 / OIDC Token" },
  },
  {
    id: "hydra-kratos-login-p5k",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "hydra-kratos-session-p5k",
    source: "ory-hydra",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "hydra-protected-direct-p5k",
    source: "ory-hydra",
    target: "ory-elements",
    sourceHandle: "out-top",
    targetHandle: "in-bottom",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
  {
    id: "idp-polis-saml-p5k",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "idp-polis-assertion-p5k",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom-2",
    targetHandle: "in-top-2",
    type: "smoothstep-dashed",
    data: { label: "SAML / Assertion" },
  },
  {
    id: "idp-polis-scim-p5k",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom-3",
    targetHandle: "in-top-3",
    type: "smoothstep-solid",
    data: { label: "SCIM" },
  },
  {
    id: "polis-kratos-sso-p5k",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left",
    targetHandle: "in-right",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "polis-kratos-identity-p5k",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left-2",
    targetHandle: "in-right-2",
    type: "smoothstep-dashed",
    data: { label: "Identity" },
  },
]

// Preset 6: kratos + hydra (no Elements) — API-only OAuth
const kratosHydraPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 240 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "your-app-backend",
    type: "plain",
    position: { x: 280, y: 240 },
    data: { label: "Your App/Backend" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 160 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 560, y: 320 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosHydraPresetEdges: Edge[] = [
  {
    id: "kh-user-app",
    source: "user",
    target: "your-app-backend",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
  },
  {
    id: "kh-app-kratos",
    source: "your-app-backend",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / login" },
  },
  {
    id: "kh-kratos-hydra-login",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "kh-kratos-hydra-consent",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Identity / consent" },
  },
  {
    id: "kh-hydra-app",
    source: "ory-hydra",
    target: "your-app-backend",
    sourceHandle: "out-left",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
]

// Preset 6b: kratos + hydra + keto — Keto next to App/Backend
const kratosHydraKetoPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 240 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "your-app-backend",
    type: "plain",
    position: { x: 280, y: 240 },
    data: { label: "Your App/Backend" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 540, y: 240 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 160 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 560, y: 320 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const kratosHydraKetoPresetEdges: Edge[] = [
  {
    id: "kh-user-app-kk",
    source: "user",
    target: "your-app-backend",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
  },
  {
    id: "app-keto-permissions-kh",
    source: "your-app-backend",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
  {
    id: "kh-app-kratos-kk",
    source: "your-app-backend",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Session / login" },
  },
  {
    id: "kh-kratos-hydra-login-kk",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "kh-kratos-hydra-consent-kk",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Identity / consent" },
  },
  {
    id: "kh-hydra-app-kk",
    source: "ory-hydra",
    target: "your-app-backend",
    sourceHandle: "out-left",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
]

// Preset 7: with-polis — Enterprise SSO (IdP → Polis → Kratos)
const withPolisPresetNodes: Node[] = [
  {
    id: "corporate-idp",
    type: "plain",
    position: { x: 0, y: 40 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 280, y: 80 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "#f97316",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 80 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]
const withPolisPresetEdges: Edge[] = [
  {
    id: "wp-idp-polis-sso",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "wp-idp-polis-assertion",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-right-2",
    targetHandle: "in-left-2",
    type: "smoothstep-dashed",
    data: { label: "SAML / Assertion" },
  },
  {
    id: "wp-idp-polis-scim",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-right-3",
    targetHandle: "in-left-3",
    type: "smoothstep-solid",
    data: { label: "SCIM" },
  },
  {
    id: "wp-polis-kratos-sso",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "wp-polis-kratos-identity",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-right-2",
    targetHandle: "in-left-2",
    type: "smoothstep-dashed",
    data: { label: "Identity" },
  },
  {
    id: "wp-user-kratos",
    source: "user",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
]

// Preset 7: full stack (layout matches steps 4–5 + Oathkeeper & Protected App below center)
const fullPresetNodes: Node[] = [
  {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 260 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 500, y: 260 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "#22c55e",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "corporate-idp",
    type: "plain",
    position: { x: 860, y: 260 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "#dc2626",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "#f97316",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 860, y: 400 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "#f97316",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "ory-oathkeeper",
    type: "oryProduct",
    position: { x: 560, y: 500 },
    data: {
      label: "Ory Oathkeeper\n• Proxy Gateway",
      dotColor: "#ec4899",
      bgColor: "#fbcfe8",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: "protected-app",
    type: "plain",
    position: { x: 560, y: 620 },
    data: { label: "Protected App/API\nBackend services" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]

const fullPresetEdges: Edge[] = [
  {
    id: "idp-polis-saml",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "idp-polis-assertion",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom-2",
    targetHandle: "in-top-2",
    type: "smoothstep-dashed",
    data: { label: "SAML / Assertion" },
  },
  {
    id: "idp-polis-scim",
    source: "corporate-idp",
    target: "ory-polis",
    sourceHandle: "out-bottom-3",
    targetHandle: "in-top-3",
    type: "smoothstep-solid",
    data: { label: "SCIM" },
  },
  {
    id: "polis-kratos-sso",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left",
    targetHandle: "in-right",
    type: "smoothstep-solid",
    data: { label: "SSO" },
  },
  {
    id: "polis-kratos-identity",
    source: "ory-polis",
    target: "ory-kratos",
    sourceHandle: "out-left-2",
    targetHandle: "in-right-2",
    type: "smoothstep-dashed",
    data: { label: "Identity" },
  },
  {
    id: "kratos-polis-scim",
    source: "ory-kratos",
    target: "ory-polis",
    sourceHandle: "out-right-2",
    targetHandle: "in-left-2",
    type: "smoothstep-solid",
    data: { label: "SCIM" },
  },
  {
    id: "kratos-hydra-login",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-left",
    targetHandle: "in-right",
    type: "smoothstep-solid",
    data: { label: "Delegates login" },
  },
  {
    id: "kratos-hydra-consent",
    source: "ory-kratos",
    target: "ory-hydra",
    sourceHandle: "out-left",
    targetHandle: "in-right",
    type: "smoothstep-dashed",
    data: { label: "Identity / consent" },
  },
  {
    id: "user-oathkeeper",
    source: "user",
    target: "ory-oathkeeper",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
  },
  {
    id: "kratos-oathkeeper",
    source: "ory-kratos",
    target: "ory-oathkeeper",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "hydra-oathkeeper",
    source: "ory-hydra",
    target: "ory-oathkeeper",
    sourceHandle: "out-right",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Code / token" },
  },
  {
    id: "oathkeeper-keto",
    source: "ory-oathkeeper",
    target: "ory-keto",
    sourceHandle: "out-top",
    targetHandle: "in-bottom",
    type: "smoothstep-dashed",
    data: { label: "Allow / deny" },
  },
  {
    id: "oathkeeper-protected",
    source: "ory-oathkeeper",
    target: "protected-app",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-solid",
    data: { label: "Forward / block" },
  },
  {
    id: "user-keto",
    source: "user",
    target: "ory-keto",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-dashed",
    data: { label: "Permissions" },
  },
  {
    id: "keto-protected",
    source: "ory-keto",
    target: "protected-app",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Allow / deny" },
  },
  {
    id: "user-kratos-direct",
    source: "user",
    target: "ory-kratos",
    sourceHandle: "out-right",
    targetHandle: "in-left",
    type: "smoothstep-solid",
    data: { label: "Session / login" },
  },
  {
    id: "kratos-protected-direct",
    source: "ory-kratos",
    target: "protected-app",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "Session / JWT" },
  },
  {
    id: "elements-hydra",
    source: "ory-elements",
    target: "ory-hydra",
    sourceHandle: "out-bottom",
    targetHandle: "in-top",
    type: "smoothstep-dashed",
    data: { label: "OAuth2" },
  },
]

const DIAGRAM_PRESETS: DiagramPreset[] = [
  {
    id: "empty",
    products: [],
    nodes: emptyPresetNodes,
    edges: emptyPresetEdges,
  },
  {
    id: "kratos",
    products: ["kratos"],
    nodes: kratosPresetNodes,
    edges: kratosPresetEdges,
  },
  {
    id: "kratos-keto",
    products: ["kratos", "keto"],
    nodes: kratosKetoPresetNodes,
    edges: kratosKetoPresetEdges,
  },
  {
    id: "kratos-elements",
    products: ["kratos", "elements"],
    nodes: kratosElementsPresetNodes,
    edges: kratosElementsPresetEdges,
  },
  {
    id: "kratos-elements-keto",
    products: ["kratos", "elements", "keto"],
    nodes: kratosElementsKetoPresetNodes,
    edges: kratosElementsKetoPresetEdges,
  },
  {
    id: "kratos-elements-hydra",
    products: ["kratos", "elements", "hydra"],
    nodes: kratosElementsHydraPresetNodes,
    edges: kratosElementsHydraPresetEdges,
  },
  {
    id: "kratos-elements-hydra-keto",
    products: ["kratos", "elements", "hydra", "keto"],
    nodes: kratosElementsHydraKetoPresetNodes,
    edges: kratosElementsHydraKetoPresetEdges,
  },
  {
    id: "kratos-elements-hydra-polis",
    products: ["kratos", "elements", "hydra", "polis"],
    nodes: kratosElementsHydraPolisPresetNodes,
    edges: kratosElementsHydraPolisPresetEdges,
  },
  {
    id: "kratos-elements-hydra-polis-keto",
    products: ["kratos", "elements", "hydra", "polis", "keto"],
    nodes: kratosElementsHydraPolisKetoPresetNodes,
    edges: kratosElementsHydraPolisKetoPresetEdges,
  },
  {
    id: "kratos-hydra",
    products: ["kratos", "hydra"],
    nodes: kratosHydraPresetNodes,
    edges: kratosHydraPresetEdges,
  },
  {
    id: "kratos-hydra-keto",
    products: ["kratos", "hydra", "keto"],
    nodes: kratosHydraKetoPresetNodes,
    edges: kratosHydraKetoPresetEdges,
  },
  {
    id: "with-polis",
    products: ["kratos", "polis"],
    nodes: withPolisPresetNodes,
    edges: withPolisPresetEdges,
  },
  {
    id: "full",
    products: ["kratos", "elements", "hydra", "polis", "keto", "oathkeeper"],
    nodes: fullPresetNodes,
    edges: fullPresetEdges,
  },
]

function productSetEqual(a: ProductKey[], b: ProductKey[]): boolean {
  if (a.length !== b.length) return false
  const setA = new Set(a)
  for (const p of b) {
    if (!setA.has(p)) return false
  }
  return true
}

/** Resolve selectedProducts to one of the presets. Exact match first, then smallest superset, then full. */
export function getPresetForProducts(
  selectedProducts: ProductKey[],
): DiagramPreset {
  // Exact match
  for (const preset of DIAGRAM_PRESETS) {
    if (productSetEqual(preset.products, selectedProducts)) return preset
  }
  // Smallest superset that contains all selected products (prefer more specific presets)
  const supersets = DIAGRAM_PRESETS.filter((preset) => {
    return selectedProducts.every((p) => preset.products.includes(p))
  })
  if (supersets.length > 0) {
    supersets.sort((a, b) => a.products.length - b.products.length)
    return supersets[0]
  }
  // Fallback: full preset
  return DIAGRAM_PRESETS[DIAGRAM_PRESETS.length - 1]
}
