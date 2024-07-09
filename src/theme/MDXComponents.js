import React from "react"
import MDXComponents from "@theme-original/MDXComponents"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import AjaxWarning from "./AjaxWarning"
import ConsoleLink from "../components/ConsoleLink/console-link"

export default {
  // Re-use the default mapping
  ...MDXComponents,
  AjaxWarning,
  ConsoleLink,
  Tabs,
  TabItem
}
