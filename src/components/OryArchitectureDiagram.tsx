// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

/**
 * Ory IAM architecture diagram built with ReactFlow (open-source).
 */

import React, { useCallback, useMemo, useEffect, useRef, useState } from "react"
import {
  ReactFlow,
  BaseEdge,
  getSmoothStepPath,
  Position,
  Handle,
  useNodesState,
  useEdgesState,
  addEdge,
  reconnectEdge,
  Connection,
  EdgeProps,
  NodeProps,
  Node,
  Edge,
  Controls,
  ControlButton,
  useReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import type { ProductKey } from "./welcomePage/solutionDesignTypes"
import {
  getPresetForProducts,
  shouldShowScimEdges,
} from "./OryArchitectureDiagramPresets"

export type { DiagramPreset } from "./OryArchitectureDiagramPresets"

// Hide connection handles visually (diagram is readonly); edges still use their positions.
const hiddenHandleStyle: React.CSSProperties = {
  opacity: 0,
  width: 0,
  height: 0,
  border: "none",
  background: "transparent",
  pointerEvents: "none",
}

// --- Custom node: Ory product box with colored dot ---
type OryProductData = { label: string; dotColor: string; bgColor: string }
function OryProductNode({
  data,
  selected,
}: NodeProps<Node<OryProductData, "oryProduct">>) {
  const { label, dotColor, bgColor } = data ?? {}
  const lines = (label ?? "").split(/\r?\n/)
  const title = lines[0] ?? ""
  const subtitle = lines.slice(1).join("\n")
  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${selected ? "var(--ory-info-primary)" : "var(--ory-border-primary)"}`,
        borderRadius: 8,
        padding: "10px 14px",
        minWidth: 140,
        position: "relative",
        boxShadow: selected ? "0 0 0 2px var(--ory-info-primary)" : undefined,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: subtitle ? 4 : 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: dotColor,
            flexShrink: 0,
          }}
        />
        <div style={{ fontSize: 12, fontWeight: 600 }}>{title}</div>
      </div>
      {subtitle ? (
        <div
          style={{
            fontSize: 11,
            color: "var(--ory-text-tertiary)",
            paddingLeft: 14,
            whiteSpace: "pre-line",
          }}
        >
          {subtitle}
        </div>
      ) : null}
      <Handle
        type="target"
        position={Position.Top}
        id="in-top"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="in-top-2"
        style={{ ...hiddenHandleStyle, left: "25%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="in-top-3"
        style={{ ...hiddenHandleStyle, left: "75%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left-2"
        style={{ ...hiddenHandleStyle, top: "70%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left-3"
        style={{ ...hiddenHandleStyle, top: "30%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right-2"
        style={{ ...hiddenHandleStyle, top: "70%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left-2"
        style={{ ...hiddenHandleStyle, top: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-2"
        style={{ ...hiddenHandleStyle, top: "70%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-2"
        style={{ ...hiddenHandleStyle, left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-3"
        style={{ ...hiddenHandleStyle, left: "75%" }}
      />
    </div>
  )
}

function PlainNode({
  data,
  selected,
}: NodeProps<Node<{ label: string }, "plain">>) {
  return (
    <div
      style={{
        background: "var(--ory-bg-secondary)",
        border: `1px solid ${selected ? "var(--ory-info-primary)" : "var(--ory-border-primary)"}`,
        borderRadius: 8,
        padding: "10px 14px",
        minWidth: 120,
        fontSize: 12,
        boxShadow: selected ? "0 0 0 2px var(--ory-info-primary)" : undefined,
      }}
    >
      {(data?.label ?? "").split(/\r?\n/).map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <Handle
        type="target"
        position={Position.Top}
        id="in-top"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="out-top"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        style={{ ...hiddenHandleStyle, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-2"
        style={{ ...hiddenHandleStyle, top: "70%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-3"
        style={{ ...hiddenHandleStyle, top: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom"
        style={{ ...hiddenHandleStyle, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-2"
        style={{ ...hiddenHandleStyle, left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-3"
        style={{ ...hiddenHandleStyle, left: "75%" }}
      />
    </div>
  )
}

const nodeTypes = {
  oryProduct: OryProductNode,
  plain: PlainNode,
}

function LabeledSmoothStepEdge({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  data,
  style,
  label: propLabel,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 6,
  })
  const label = propLabel ?? (data as { label?: string })?.label
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={style}
        label={label}
        labelX={labelX}
        labelY={labelY}
        labelStyle={{
          fontSize: 10,
          fill: "var(--ory-text-secondary)",
          fontWeight: 500,
        }}
        labelBgStyle={{
          fill: "var(--ory-bg-primary)",
          stroke: "var(--ory-border-primary)",
        }}
        labelBgBorderRadius={4}
        labelBgPadding={[4, 6] as [number, number]}
      />
    </>
  )
}

const edgeTypes = {
  "smoothstep-solid": (props: EdgeProps) => (
    <LabeledSmoothStepEdge {...props} />
  ),
  "smoothstep-dashed": (props: EdgeProps) => (
    <LabeledSmoothStepEdge
      {...props}
      style={{ ...props.style, strokeDasharray: "6 4" }}
    />
  ),
}

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

// TODO: replace with icons from design system
const svgProps = {
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
            <svg {...svgProps}>
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
            <svg {...svgProps}>
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
            <svg {...svgProps}>
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
          <svg {...svgProps}>
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
        ) : (
          <svg {...svgProps}>
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
  const preset = useMemo(
    () => getPresetForProducts(selectedProducts),
    [selectedProducts],
  )
  const presetNodes = preset.nodes
  const presetEdges = useMemo(() => {
    const base = preset.edges
    const showScim = shouldShowScimEdges(scimSelected, currentStep)
    if (showScim) return base
    return base.filter((e) => {
      if (
        e.source === "corporate-idp" &&
        e.target === "ory-polis" &&
        (e.data as { label?: string })?.label === "SCIM"
      )
        return false
      if (
        e.source === "ory-kratos" &&
        e.target === "ory-polis" &&
        (e.data as { label?: string })?.label === "SCIM"
      )
        return false
      return true
    })
  }, [preset.edges, scimSelected, currentStep])

  const [nodes, setNodes, onNodesChange] = useNodesState(presetNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(presetEdges)

  useEffect(() => {
    setNodes(presetNodes)
    setEdges(presetEdges)
  }, [presetNodes, presetEdges, setNodes, setEdges])

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
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
