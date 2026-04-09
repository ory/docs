// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { Node, Edge } from "@xyflow/react"
import type { ProductKey } from "./welcomePage/solutionDesignStepper/types/solutionDesignTypes"
import {
  buildVisibleNodes,
  shouldShowExistingIdp,
} from "./solutionDesignDiagram/consts/canonicalNodes"
import {
  applyCompactRowLayout,
  applyKratosKetoOnlyEdgeHandles,
  applyKratosKetoOnlyNodePositionAdjustments,
  applyOathkeeperTopologyEdgeHandles,
  applyPolisElementsKetoNoKratosHandles,
  collectEdges,
  filterEdgesByVisibleNodes,
  remapEdgesForCompactRow,
  spreadScimEdgeHandles,
} from "./solutionDesignDiagram/consts/graph"

export const SCIM_STEP_INDEX = 4

export function shouldShowScimEdges(
  scimSelected: boolean,
  currentStep: number | undefined,
): boolean {
  if (!scimSelected) return false
  if (currentStep === undefined) return true
  return currentStep >= SCIM_STEP_INDEX
}

export interface ArchitectureGraph {
  nodes: Node[]
  edges: Edge[]
}

export function buildArchitectureGraph(
  selectedProducts: ProductKey[],
  scimSelected: boolean,
  currentStep: number | undefined,
  identityAnswer?: "yes" | "no",
): ArchitectureGraph {
  const selected = new Set(selectedProducts)
  const showScim = shouldShowScimEdges(scimSelected, currentStep)

  const productCountExcludingElements = selectedProducts.filter(
    (p) => p !== "elements",
  ).length
  const effectiveProductCount =
    productCountExcludingElements +
    (shouldShowExistingIdp(selected, identityAnswer) ? 1 : 0) +
    // Polis selection introduces a second node ("corporate-idp") in the diagram.
    (selected.has("polis") ? 1 : 0)
  const compactRowLayout = effectiveProductCount <= 1
  let nodes = buildVisibleNodes(
    selectedProducts,
    compactRowLayout,
    identityAnswer,
  )
  if (compactRowLayout) {
    nodes = applyCompactRowLayout(nodes)
  }
  nodes = applyKratosKetoOnlyNodePositionAdjustments(
    nodes,
    selected,
    compactRowLayout,
  )

  const nodeIds = new Set(nodes.map((n) => n.id))

  let edges = collectEdges(selected, showScim, identityAnswer)
  edges = filterEdgesByVisibleNodes(edges, nodeIds)
  if (compactRowLayout) {
    edges = remapEdgesForCompactRow(edges, nodes)
  }
  edges = spreadScimEdgeHandles(edges, showScim)
  edges = applyOathkeeperTopologyEdgeHandles(
    edges,
    selected,
    compactRowLayout,
    showScim,
  )
  edges = applyKratosKetoOnlyEdgeHandles(edges, selected, compactRowLayout)
  edges = applyPolisElementsKetoNoKratosHandles(edges, selected)

  return { nodes, edges }
}
