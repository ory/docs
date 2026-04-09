// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import { Position, Handle, type NodeProps, type Node } from "@xyflow/react"

export const architectureDiagramHiddenHandleStyle: React.CSSProperties = {
  opacity: 0,
  width: 0,
  height: 0,
  border: "none",
  background: "transparent",
  pointerEvents: "none",
}

type OryProductData = { label: string; dotColor: string; bgColor: string }

function OryProductNode({
  data,
  selected,
}: NodeProps<Node<OryProductData, "oryProduct">>) {
  const hs = architectureDiagramHiddenHandleStyle
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
            width: 8,
            height: 8,
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
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="in-top-2"
        style={{ ...hs, left: "25%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="in-top-3"
        style={{ ...hs, left: "75%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="in-top-4"
        style={{ ...hs, left: "90%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left-2"
        style={{ ...hs, top: "70%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left-3"
        style={{ ...hs, top: "30%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right-2"
        style={{ ...hs, top: "70%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right-3"
        style={{ ...hs, top: "30%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right-4"
        style={{ ...hs, top: "85%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom"
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom-4"
        style={{ ...hs, left: "90%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left-2"
        style={{ ...hs, top: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left-3"
        style={{ ...hs, top: "15%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="out-left-4"
        style={{ ...hs, top: "80%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-2"
        style={{ ...hs, top: "70%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-3"
        style={{ ...hs, top: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom"
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-2"
        style={{ ...hs, left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-3"
        style={{ ...hs, left: "75%" }}
      />
    </div>
  )
}

function PlainNode({
  data,
  selected,
}: NodeProps<Node<{ label: string }, "plain">>) {
  const hs = architectureDiagramHiddenHandleStyle
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
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="in-left"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="in-right"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom"
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="in-bottom-4"
        style={{ ...hs, left: "90%" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="out-top"
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right"
        style={{ ...hs, top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-2"
        style={{ ...hs, top: "70%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out-right-3"
        style={{ ...hs, top: "30%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom"
        style={{ ...hs, left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-2"
        style={{ ...hs, left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out-bottom-3"
        style={{ ...hs, left: "75%" }}
      />
    </div>
  )
}

export const architectureDiagramNodeTypes = {
  oryProduct: OryProductNode,
  plain: PlainNode,
}
