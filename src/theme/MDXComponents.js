import React from "react"
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents"
import ConsoleLink from "../components/ConsoleLink/console-link"


export default {
    // Re-use the default mapping
    ...MDXComponents,
    ConsoleLink,
}
