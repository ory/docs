/**
 * Global site footer – replaces the default Docusaurus footer on all pages.
 * Renders the shared WelcomeFooter design (copyright, legal links, status pill).
 */
import React from "react"
import { WelcomeFooter } from "@site/src/components/welcomePage/WelcomeFooter"

export default function Footer(): React.ReactElement {
  return <WelcomeFooter />
}
