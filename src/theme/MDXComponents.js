import React from "react"
import MDXComponents from "@theme-original/MDXComponents"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import AjaxWarning from "./AjaxWarning"
import ConsoleLink from "../components/ConsoleLink/console-link"
import RateLimitsTable from "../components/RateLimitsTable"
import SameDeploymentLink from "../components/SameDeploymentLink"

export default {
  // Re-use the default mapping
  ...MDXComponents,
  AjaxWarning,
  ConsoleLink,
  RateLimitsTable,
  SameDeploymentLink,
  Tabs,
  TabItem,
}
