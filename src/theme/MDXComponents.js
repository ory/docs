import React from "react"
import MDXComponents from "@theme-original/MDXComponents"
import AjaxWarning from "./AjaxWarning"
import ConsoleLink from "../components/ConsoleLink/console-link"

export default {
  // Re-use the default mapping
  ...MDXComponents,
  AjaxWarning,
  ConsoleLink,
}
