// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Position } from "@xyflow/react"
import type { Node } from "@xyflow/react"
import type { ProductKey } from "../../welcomePage/solutionDesignStepper/types/solutionDesignTypes"

type CanonicalNodeMap = Record<string, Omit<Node, "id"> & { id: string }>

/** Default multi-row layout and gateway layer positions. */
const P5K_CANONICAL_NODES: CanonicalNodeMap = {
  user: {
    id: "user",
    type: "plain",
    position: { x: 0, y: 280 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-elements": {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 220, y: 280 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-keto": {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 500, y: 280 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "var(--icon-keto-tertiary)",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "corporate-idp": {
    id: "corporate-idp",
    type: "plain",
    position: { x: 870, y: 260 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-hydra": {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 220, y: 400 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "var(--icon-hydra-tertiary)",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-kratos": {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 620, y: 400 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "var(--icon-kratos-tertiary)",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-polis": {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 860, y: 400 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "var(--icon-polis-tertiary)",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-oathkeeper": {
    id: "ory-oathkeeper",
    type: "oryProduct",
    position: { x: 560, y: 500 },
    data: {
      label: "Ory Oathkeeper\n• Proxy Gateway",
      dotColor: "var(--icon-oathkeeper-tertiary)",
      bgColor: "#fbcfe8",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "protected-app": {
    id: "protected-app",
    type: "plain",
    position: { x: 560, y: 620 },
    data: { label: "Protected App/API\nBackend services" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
}

/** Oathkeeper-centered layout when the gateway product is selected. */
const OATHKEEPER_CANONICAL_NODES: CanonicalNodeMap = {
  user: {
    id: "user",
    type: "plain",
    position: { x: 50, y: 530 },
    data: { label: "User" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-elements": {
    id: "ory-elements",
    type: "oryProduct",
    position: { x: 300, y: 520 },
    data: {
      label: "Your App/Backend\n(With Ory Elements)",
      dotColor: "#8b5cf6",
      bgColor: "#ede9fe",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-keto": {
    id: "ory-keto",
    type: "oryProduct",
    position: { x: 820, y: 520 },
    data: {
      label: "Ory Keto\n• Permissions",
      dotColor: "var(--icon-keto-tertiary)",
      bgColor: "#bbf7d0",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "corporate-idp": {
    id: "corporate-idp",
    type: "plain",
    position: { x: 300, y: 220 },
    data: { label: "Corporate IdP\nSAML, AD, etc" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-hydra": {
    id: "ory-hydra",
    type: "oryProduct",
    position: { x: 860, y: 380 },
    data: {
      label: "Ory Hydra\n• OAuth2 / OIDC",
      dotColor: "var(--icon-hydra-tertiary)",
      bgColor: "#fecaca",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-kratos": {
    id: "ory-kratos",
    type: "oryProduct",
    position: { x: 560, y: 380 },
    data: {
      label: "Ory Kratos\n• Identity & AuthN",
      dotColor: "var(--icon-kratos-tertiary)",
      bgColor: "#fed7aa",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-polis": {
    id: "ory-polis",
    type: "oryProduct",
    position: { x: 300, y: 380 },
    data: {
      label: "Ory Polis\n• Enterprise SSO",
      dotColor: "var(--icon-polis-tertiary)",
      bgColor: "#fef08a",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "ory-oathkeeper": {
    id: "ory-oathkeeper",
    type: "oryProduct",
    position: { x: 560, y: 520 },
    data: {
      label: "Ory Oathkeeper\n• Proxy Gateway",
      dotColor: "var(--icon-oathkeeper-tertiary)",
      bgColor: "#fbcfe8",
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  "protected-app": {
    id: "protected-app",
    type: "plain",
    position: { x: 560, y: 660 },
    data: { label: "Protected App/API\nBackend services" },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
}

function resolveCanonicalNodes(
  selected: Set<ProductKey>,
  compactRowLayout: boolean,
): CanonicalNodeMap {
  if (compactRowLayout || !selected.has("oathkeeper")) {
    return P5K_CANONICAL_NODES
  }
  return OATHKEEPER_CANONICAL_NODES
}

function cloneNode(def: Omit<Node, "id"> & { id: string }): Node {
  const { id, ...rest } = def
  return { id, ...(JSON.parse(JSON.stringify(rest)) as Omit<Node, "id">) }
}

/**
 * Reuse the Kratos slot for an external IdP (Hydra path; Polis uses Corporate IdP).
 */
export function shouldShowExistingIdp(
  selected: Set<ProductKey>,
  identityAnswer?: "yes" | "no",
): boolean {
  // Never show when Polis is selected (Corporate IdP is shown instead).
  if (selected.has("polis")) return false

  // Real Kratos product takes precedence.
  if (selected.has("kratos")) return false

  // When driven by the stepper, only show after the user explicitly chose "No".
  if (identityAnswer === "yes") return false
  if (identityAnswer === "no") return true

  // No identity context (e.g. diagram without stepper): infer from products.
  // Only show it when it's actually relevant (Hydra is present).
  return selected.has("hydra")
}

function buildKratosIdentityNode(
  selected: Set<ProductKey>,
  canonical: CanonicalNodeMap,
  identityAnswer?: "yes" | "no",
): Node | null {
  if (selected.has("kratos")) {
    return cloneNode(canonical["ory-kratos"])
  }
  if (shouldShowExistingIdp(selected, identityAnswer)) {
    const base = canonical["ory-kratos"]
    return {
      ...cloneNode(base),
      type: "plain",
      data: { label: "Your existing IdP" },
    }
  }
  return null
}

function buildAppNode(
  elementsSelected: boolean,
  canonical: CanonicalNodeMap,
): Node {
  const base = canonical["ory-elements"]
  if (elementsSelected) {
    return cloneNode(base)
  }
  return {
    ...cloneNode(base),
    type: "plain",
    data: { label: "Your App/Backend" },
  }
}

export function buildVisibleNodes(
  selectedProducts: ProductKey[],
  compactRowLayout: boolean,
  identityAnswer?: "yes" | "no",
): Node[] {
  const selected = new Set(selectedProducts)
  const canonical = resolveCanonicalNodes(selected, compactRowLayout)
  const elementsSelected = selected.has("elements")
  const nodes: Node[] = []

  nodes.push(cloneNode(canonical.user))
  nodes.push(buildAppNode(elementsSelected, canonical))

  if (selected.has("keto")) nodes.push(cloneNode(canonical["ory-keto"]))
  if (selected.has("polis")) {
    nodes.push(cloneNode(canonical["corporate-idp"]))
    nodes.push(cloneNode(canonical["ory-polis"]))
  }
  if (selected.has("hydra")) nodes.push(cloneNode(canonical["ory-hydra"]))
  const kratosIdentity = buildKratosIdentityNode(
    selected,
    canonical,
    identityAnswer,
  )
  if (kratosIdentity) nodes.push(kratosIdentity)
  if (selected.has("oathkeeper")) {
    nodes.push(cloneNode(canonical["ory-oathkeeper"]))
    nodes.push(cloneNode(canonical["protected-app"]))
  }

  return nodes
}
