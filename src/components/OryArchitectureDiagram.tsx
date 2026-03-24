// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Ory IAM architecture diagram (React Flow).
 */

import React, { useCallback, useMemo, useEffect, useRef, useState } from "react"
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  reconnectEdge,
  Connection,
  Edge,
  Controls,
  ControlButton,
  useReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import type { ProductKey } from "./welcomePage/solutionDesignStepper/types/solutionDesignTypes"
import { buildArchitectureGraph } from "./oryArchitectureDiagramModel"
import { architectureDiagramEdgeTypes } from "./solutionDesignDiagram/ui/edges"
import { architectureDiagramNodeTypes } from "./solutionDesignDiagram/ui/nodes"

export interface OryArchitectureDiagramProps {
  selectedProducts?: ProductKey[]
  scimSelected?: boolean
  currentStep?: number
  readonly?: boolean
}

function FitViewOnChange({
  selectedProducts,
}: {
  selectedProducts: ProductKey[]
}) {
  const { fitView } = useReactFlow()
  useEffect(() => {
    const id = setTimeout(() => {
      fitView({ padding: 40, duration: 200, minZoom: 1 })
    }, 50)
    return () => clearTimeout(id)
  }, [selectedProducts, fitView])
  return null
}

const controlIconSvgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24" as const,
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function DiagramControls({
  hideZoomFit,
  toggleFullscreen,
  isFullscreen,
}: {
  hideZoomFit: boolean
  toggleFullscreen: () => void
  isFullscreen: boolean
}) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const handleFitView = useCallback(
    () => fitView({ padding: 40, duration: 200, minZoom: 1 }),
    [fitView],
  )
  return (
    <Controls
      position="bottom-left"
      className={`ory-architecture-controls${hideZoomFit ? " ory-architecture-controls--compact" : ""}`}
      showZoom={false}
      showFitView={false}
      showInteractive={false}
      orientation="horizontal"
    >
      {!hideZoomFit && (
        <>
          <ControlButton
            onClick={() => zoomIn()}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <svg {...controlIconSvgProps}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
          </ControlButton>
          <ControlButton
            onClick={() => zoomOut()}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <svg {...controlIconSvgProps}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
          </ControlButton>
          <ControlButton
            onClick={handleFitView}
            title="Fit view"
            aria-label="Fit view"
          >
            <svg {...controlIconSvgProps}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </ControlButton>
        </>
      )}
      <ControlButton
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? (
          <svg {...controlIconSvgProps}>
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg {...controlIconSvgProps}>
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        )}
      </ControlButton>
    </Controls>
  )
}

export default function OryArchitectureDiagram({
  selectedProducts = [],
  scimSelected = false,
  currentStep,
  readonly = true,
}: OryArchitectureDiagramProps) {
  const { nodes: graphNodes, edges: graphEdges } = useMemo(
    () =>
      buildArchitectureGraph(selectedProducts, scimSelected, currentStep),
    [selectedProducts, scimSelected, currentStep],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(graphNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(graphEdges)

  useEffect(() => {
    setNodes(graphNodes)
    setEdges(graphEdges)
  }, [graphNodes, graphEdges, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, type: "smoothstep-solid" }, eds)),
    [setEdges],
  )

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((eds) => reconnectEdge(oldEdge, newConnection, eds)),
    [setEdges],
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const [hideZoomFit, setHideZoomFit] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 996px)")
    const handler = () => setHideZoomFit(mql.matches)
    handler()
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false))
    }
  }, [])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handler)
    return () => document.removeEventListener("fullscreenchange", handler)
  }, [])

  return (
    <div
      ref={containerRef}
      className="ory-architecture-diagram"
      style={{ height: 560, width: "100%", minWidth: 320 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={readonly ? undefined : onConnect}
        onReconnect={readonly ? undefined : onReconnect}
        nodeTypes={architectureDiagramNodeTypes}
        edgeTypes={architectureDiagramEdgeTypes}
        nodesDraggable={!readonly}
        nodesConnectable={!readonly}
        edgesReconnectable={!readonly}
        defaultEdgeOptions={{ type: "smoothstep-solid" }}
        fitView
        fitViewOptions={{ padding: 40, minZoom: 1 }}
        connectOnClick={false}
        style={{ background: "var(--ory-bg-secondary)" }}
      >
        <FitViewOnChange selectedProducts={selectedProducts} />
        <DiagramControls
          hideZoomFit={hideZoomFit}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
      </ReactFlow>
    </div>
  )
}
