import React from "react"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

const DEFAULT_FRAMEWORKS = [
  { value: "javascript", label: "Express.js (JS)" },
  { value: "typescript", label: "Express.js (TS)" },
  { value: "nextjs", label: "Next.js" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
]

export const FrameworkCodeTabs = ({ children }) => {
  // Filter out children (tabs) that don't have content
  const tabsWithContent = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return false

    // Check if the tab has any meaningful content
    const content = child.props.children
    if (!content) return false

    // If content is a string, check if it's not just whitespace
    if (typeof content === "string") {
      return content.trim().length > 0
    }

    // If content is an array, check if any element has content
    if (Array.isArray(content)) {
      return content.some((item) =>
        typeof item === "string" ? item.trim().length > 0 : !!item,
      )
    }

    return true
  })

  // Get available framework values from tabs with content
  const availableFrameworks = DEFAULT_FRAMEWORKS.filter((framework) =>
    tabsWithContent.some(
      (tab) => React.isValidElement(tab) && tab.props.value === framework.value,
    ),
  )

  return availableFrameworks.length > 0 ? (
    <Tabs
      groupId="framework-examples"
      defaultValue={availableFrameworks[0].value}
      values={availableFrameworks}
    >
      {tabsWithContent}
    </Tabs>
  ) : null
}

export default FrameworkCodeTabs
