// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { Edge, Node } from "@xyflow/react"
import type { ProductKey } from "../../welcomePage/solutionDesignStepper/types/solutionDesignTypes"

type EdgeRule = {
  edge: Edge
  when: (selected: Set<ProductKey>) => boolean
  scimSensitive?: boolean
}

function p5kBaseEdgeRules(): EdgeRule[] {
  return [
    {
      edge: {
        id: "user-elements-p5k",
        source: "user",
        target: "ory-elements",
        sourceHandle: "out-right",
        targetHandle: "in-left",
        type: "smoothstep-solid",
        data: { label: "Session / login" },
      },
      when: () => true,
    },
    {
      edge: {
        id: "elements-keto-permissions-p5k",
        source: "ory-elements",
        target: "ory-keto",
        sourceHandle: "out-right",
        targetHandle: "in-left",
        type: "smoothstep-dashed",
        data: { label: "Permissions" },
      },
      when: (s) => s.has("keto") && !s.has("oathkeeper"),
    },
    {
      edge: {
        id: "elements-hydra-request-p5k",
        source: "ory-elements",
        target: "ory-hydra",
        sourceHandle: "out-bottom",
        targetHandle: "in-top",
        type: "smoothstep-solid",
        data: { label: "Request" },
      },
      when: (s) => s.has("hydra"),
    },
    {
      edge: {
        id: "hydra-kratos-login-p5k",
        source: "ory-hydra",
        target: "ory-kratos",
        sourceHandle: "out-right",
        targetHandle: "in-left",
        type: "smoothstep-solid",
        data: { label: "Delegates login" },
      },
      when: (s) => s.has("hydra") && s.has("kratos"),
    },
    {
      edge: {
        id: "hydra-protected-direct-p5k",
        source: "ory-hydra",
        target: "ory-elements",
        sourceHandle: "out-top",
        targetHandle: "in-bottom",
        type: "smoothstep-dashed",
        data: { label: "Code / token" },
      },
      when: (s) => s.has("hydra") && !s.has("oathkeeper"),
    },
    {
      edge: {
        id: "idp-polis-saml-p5k",
        source: "corporate-idp",
        target: "ory-polis",
        sourceHandle: "out-bottom",
        targetHandle: "in-top",
        type: "smoothstep-solid",
        data: { label: "SSO / SAML" },
      },
      when: (s) => s.has("polis"),
    },
    {
      edge: {
        id: "idp-polis-scim-p5k",
        source: "corporate-idp",
        target: "ory-polis",
        sourceHandle: "out-bottom-3",
        targetHandle: "in-top-3",
        type: "smoothstep-solid",
        data: { label: "SCIM" },
      },
      when: (s) => s.has("polis"),
      scimSensitive: true,
    },
    {
      edge: {
        id: "polis-kratos-sso-p5k",
        source: "ory-polis",
        target: "ory-kratos",
        sourceHandle: "out-left",
        targetHandle: "in-right",
        type: "smoothstep-solid",
        data: { label: "SSO / Identity" },
      },
      when: (s) => s.has("polis") && s.has("kratos"),
    },
  ]
}

function kratosPolisScimRule(): EdgeRule {
  return {
    edge: {
      id: "kratos-polis-scim",
      source: "ory-kratos",
      target: "ory-polis",
      sourceHandle: "out-right-2",
      targetHandle: "in-left-2",
      type: "smoothstep-solid",
      data: { label: "SCIM" },
    },
    when: (s) => s.has("kratos") && s.has("polis"),
    scimSensitive: true,
  }
}

function appToKratosWhenNoHydra(): EdgeRule {
  return {
    edge: {
      id: "elements-kratos-no-hydra",
      source: "ory-elements",
      target: "ory-kratos",
      sourceHandle: "out-right",
      targetHandle: "in-left",
      type: "smoothstep-dashed",
      data: { label: "Session / JWT" },
    },
    when: (s) => s.has("kratos") && !s.has("hydra") && !s.has("oathkeeper"),
  }
}

function oathkeeperEdgeRules(): EdgeRule[] {
  return [
    {
      edge: {
        id: "elements-oathkeeper",
        source: "ory-elements",
        target: "ory-oathkeeper",
        sourceHandle: "out-right",
        targetHandle: "in-left",
        type: "smoothstep-solid",
        data: { label: "Forward" },
      },
      when: (s) => s.has("oathkeeper"),
    },
    {
      edge: {
        id: "kratos-oathkeeper",
        source: "ory-kratos",
        target: "ory-oathkeeper",
        sourceHandle: "out-bottom",
        targetHandle: "in-top",
        type: "smoothstep-dashed",
        data: { label: "Session / JWT" },
      },
      when: (s) => s.has("oathkeeper") && s.has("kratos"),
    },
    {
      edge: {
        id: "hydra-oathkeeper",
        source: "ory-hydra",
        target: "ory-oathkeeper",
        sourceHandle: "out-right",
        targetHandle: "in-top-4",
        type: "smoothstep-dashed",
        data: { label: "Code / token" },
      },
      when: (s) => s.has("oathkeeper") && s.has("hydra"),
    },
    {
      edge: {
        id: "oathkeeper-keto",
        source: "ory-oathkeeper",
        target: "ory-keto",
        sourceHandle: "out-top",
        targetHandle: "in-bottom",
        type: "smoothstep-dashed",
        data: { label: "Allow / deny" },
      },
      when: (s) => s.has("oathkeeper") && s.has("keto"),
    },
    {
      edge: {
        id: "oathkeeper-protected",
        source: "ory-oathkeeper",
        target: "protected-app",
        sourceHandle: "out-bottom",
        targetHandle: "in-top",
        type: "smoothstep-solid",
        data: { label: "Forward / block" },
      },
      when: (s) => s.has("oathkeeper"),
    },
  ]
}

const ALL_EDGE_RULES: EdgeRule[] = [
  ...p5kBaseEdgeRules(),
  kratosPolisScimRule(),
  appToKratosWhenNoHydra(),
  ...oathkeeperEdgeRules(),
]

export function collectEdges(selected: Set<ProductKey>, showScim: boolean): Edge[] {
  const out: Edge[] = []
  for (const rule of ALL_EDGE_RULES) {
    if (!rule.when(selected)) continue
    if (rule.scimSensitive && !showScim) continue
    const label = (rule.edge.data as { label?: string } | undefined)?.label
    if (label === "SCIM" && !showScim) continue
    out.push({ ...rule.edge })
  }
  return out
}

const COMPACT_ROW_ORDER: string[] = [
  "user",
  "ory-elements",
  "corporate-idp",
  "ory-keto",
  "ory-hydra",
  "ory-kratos",
  "ory-polis",
  "ory-oathkeeper",
  "protected-app",
]

const COMPACT_ROW_Y = 280
const COMPACT_ROW_GAP_X = 260

function rowOrderIndex(id: string): number {
  const i = COMPACT_ROW_ORDER.indexOf(id)
  return i === -1 ? 999 : i
}

/** Single-row layout when at most two products are selected. */
export function applyCompactRowLayout(nodes: Node[]): Node[] {
  const sorted = [...nodes].sort(
    (a, b) => rowOrderIndex(a.id) - rowOrderIndex(b.id),
  )
  return sorted.map((n, i) => ({
    ...n,
    position: { x: i * COMPACT_ROW_GAP_X, y: COMPACT_ROW_Y },
  }))
}

/** Remap edge handles to left/right after compact layout. */
export function remapEdgesForCompactRow(edges: Edge[], nodes: Node[]): Edge[] {
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const pairIndex = new Map<string, number>()
  return edges.map((e) => {
    const src = byId.get(e.source)
    const tgt = byId.get(e.target)
    if (!src || !tgt) return e
    const pairKey = `${e.source}->${e.target}`
    const idx = pairIndex.get(pairKey) ?? 0
    pairIndex.set(pairKey, idx + 1)
    const suf = idx === 0 ? "" : idx === 1 ? "-2" : "-3"
    const dx = tgt.position.x - src.position.x
    if (Math.abs(dx) < 1) return e
    if (dx > 0) {
      return {
        ...e,
        sourceHandle: `out-right${suf}`,
        targetHandle: `in-left${suf}`,
      }
    }
    return {
      ...e,
      sourceHandle: `out-left${suf}`,
      targetHandle: `in-right${suf}`,
    }
  })
}

/** Offset handles when SCIM edges are visible to reduce path overlap. */
export function spreadScimEdgeHandles(edges: Edge[], showScim: boolean): Edge[] {
  if (!showScim) return edges
  return edges.map((e) => {
    switch (e.id) {
      case "idp-polis-saml-p5k":
        return {
          ...e,
          sourceHandle: "out-bottom-2",
          targetHandle: "in-top-2",
        }
      case "idp-polis-scim-p5k":
        return {
          ...e,
          sourceHandle: "out-bottom-3",
          targetHandle: "in-top-3",
        }
      case "polis-kratos-sso-p5k":
        return {
          ...e,
          sourceHandle: "out-left-3",
          targetHandle: "in-right-3",
        }
      case "kratos-polis-scim":
        return {
          ...e,
          sourceHandle: "out-right-2",
          targetHandle: "in-left-2",
        }
      default:
        return e
    }
  })
}

/** Adjust handles for Oathkeeper multi-row layout (not compact row). */
export function applyOathkeeperTopologyEdgeHandles(
  edges: Edge[],
  selected: Set<ProductKey>,
  compactRowLayout: boolean,
  showScim: boolean,
): Edge[] {
  if (compactRowLayout || !selected.has("oathkeeper")) {
    return edges
  }
  return edges.map((e) => {
    switch (e.id) {
      case "hydra-kratos-login-p5k":
        return {
          ...e,
          sourceHandle: "out-left",
          targetHandle: "in-right",
        }
      case "elements-hydra-request-p5k":
        return {
          ...e,
          sourceHandle: "out-top",
          targetHandle: "in-bottom",
        }
      case "oathkeeper-keto":
        return {
          ...e,
          sourceHandle: "out-right",
          targetHandle: "in-left",
        }
      case "hydra-oathkeeper":
        return {
          ...e,
          sourceHandle: "out-bottom",
          targetHandle: "in-top-4",
        }
      case "polis-kratos-sso-p5k":
        if (showScim) {
          return {
            ...e,
            sourceHandle: "out-right-3",
            targetHandle: "in-left-3",
          }
        }
        return {
          ...e,
          sourceHandle: "out-right",
          targetHandle: "in-left",
        }
      case "kratos-polis-scim":
        return {
          ...e,
          sourceHandle: "out-left-4",
          targetHandle: "in-right-2",
        }
      default:
        return e
    }
  })
}

export function filterEdgesByVisibleNodes(
  edges: Edge[],
  nodeIds: Set<string>,
): Edge[] {
  return edges.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
}
