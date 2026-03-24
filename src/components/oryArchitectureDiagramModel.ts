// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { Node, Edge } from "@xyflow/react"
import type { ProductKey } from "./welcomePage/solutionDesignStepper/types/solutionDesignTypes"
import { buildVisibleNodes } from "./solutionDesignDiagram/consts/canonicalNodes"
import {
  applyCompactRowLayout,
  applyOathkeeperTopologyEdgeHandles,
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
): ArchitectureGraph {
  const selected = new Set(selectedProducts)
  const showScim = shouldShowScimEdges(scimSelected, currentStep)

  const compactRowLayout = selectedProducts.length <= 2
  let nodes = buildVisibleNodes(selectedProducts, compactRowLayout)
  if (compactRowLayout) {
    nodes = applyCompactRowLayout(nodes)
  }

  const nodeIds = new Set(nodes.map((n) => n.id))

  let edges = collectEdges(selected, showScim)
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

  return { nodes, edges }
}
