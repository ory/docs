import React, { useState } from "react"
import IconTypescript from "@site/src/static/img/icons/typescript.svg"
import IconNextjs from "@site/src/static/img/icons/nextjs.svg"
import IconVue from "@site/src/static/img/icons/vue.svg"
import IconGo from "@site/src/static/img/icons/go.svg"
import {
  SelectFrameworkBlock,
  type FrameworkOption,
  type FrameworkValue,
} from "./SelectFrameworkBlock"

const FRAMEWORKS: FrameworkOption[] = [
  {
    value: "typescript",
    label: "Typescript",
    Icon: IconTypescript as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the full guide for Typescript",
    guideSteps: [
      "Set up Ory SDK and environment variables",
      "Protect routes with login and sessions",
      "Handle logout, recovery, and verification flows",
    ],
    guideTo: "/getting-started/overview",
  },
  {
    value: "nextjs",
    label: "Next.js",
    Icon: IconNextjs as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the full guide for Next.js",
    guideSteps: [
      "Set up Ory SDK and environment variables",
      "Protect routes with login and sessions",
      "Handle logout, recovery, and verification flows",
    ],
    guideTo: "/getting-started/overview",
  },
  {
    value: "vue",
    label: "Vue",
    Icon: IconVue as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the full guide for Vue",
    guideSteps: [
      "Set up Ory SDK and environment variables",
      "Protect routes with login and sessions",
      "Handle logout, recovery, and verification flows",
    ],
    guideTo: "/getting-started/overview",
  },
  {
    value: "go",
    label: "Go",
    Icon: IconGo as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the full guide for Go",
    guideSteps: [
      "Set up Ory SDK and environment variables",
      "Protect routes with login and sessions",
      "Handle logout, recovery, and verification flows",
    ],
    guideTo: "/getting-started/overview",
  },
]

/**
 * Step 3 section: framework/language selector with code snippet and guide CTA.
 * Composes FrameworkCodeSnippet (inside SelectFrameworkBlock) and the framework selector UI.
 */
export function SelectFrameworkSection() {
  const [selectedFramework, setSelectedFramework] =
    useState<FrameworkValue>("nextjs")

  return (
    <SelectFrameworkBlock
      frameworks={FRAMEWORKS}
      selectedFramework={selectedFramework}
      onFrameworkChange={setSelectedFramework}
    />
  )
}
