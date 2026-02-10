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

const QUICKSTART_OVERVIEW = "/getting-started/overview"

const FRAMEWORKS: FrameworkOption[] = [
  {
    value: "typescript",
    label: "Typescript",
    Icon: IconTypescript as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the quickstart guide for Typescript",
    guideTo: `${QUICKSTART_OVERVIEW}?language=typescript`,
  },
  {
    value: "nextjs",
    label: "Next.js",
    Icon: IconNextjs as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the quickstart guide for Next.js",
    guideTo: `${QUICKSTART_OVERVIEW}?language=nextjs`,
  },
  {
    value: "vue",
    label: "Vue",
    Icon: IconVue as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the quickstart guide for Vue",
    guideTo: `${QUICKSTART_OVERVIEW}?language=vue`,
  },
  {
    value: "go",
    label: "Go",
    Icon: IconGo as React.ComponentType<React.SVGProps<SVGSVGElement>>,
    snippet: "npm install @ory/elements-react @ory/nextjs",
    guideTitle: "Follow the quickstart guide for Go",
    guideTo: `${QUICKSTART_OVERVIEW}?language=go`,
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
