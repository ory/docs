import React, { ReactNode } from "react"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

type Framework = {
  label: string
  value: string
}

type FrameworkCodeTabsProps = {
  defaultValue?: string
  children: ReactNode
}

// Standard frameworks with consistent ordering
const DEFAULT_FRAMEWORKS: Framework[] = [
  { label: "JavaScript/Node.js", value: "javascript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Go", value: "go" },
  { label: "cURL", value: "curl" },
]

/**
 * A wrapper around the Tabs component that automatically sets the groupId
 * to ensure tab selection is synced across all instances.
 */
export const FrameworkCodeTabs: React.FC<FrameworkCodeTabsProps> = ({
  defaultValue = "javascript",
  children,
}) => {
  return (
    <Tabs
      groupId="framework"
      defaultValue={defaultValue}
      values={DEFAULT_FRAMEWORKS}
    >
      {children}
    </Tabs>
  )
}

export default FrameworkCodeTabs
