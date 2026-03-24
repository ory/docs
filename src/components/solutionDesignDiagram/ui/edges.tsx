// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"
import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react"

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

export const architectureDiagramEdgeTypes = {
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
