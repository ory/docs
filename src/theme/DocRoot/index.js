import React from "react"
import clsx from "clsx"
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common"
import {
  DocsSidebarProvider,
  useDocRootMetadata,
  useDocsVersion,
} from "@docusaurus/plugin-content-docs/client"
import DocRootLayout from "@theme/DocRoot/Layout"
import NotFoundContent from "@theme/NotFound/Content"
import {
  QuickstartsDeploymentProvider,
  useQuickstartsDeployment,
} from "@site/src/contexts/QuickstartsDeploymentContext"

const QUICKSTARTS_SIDEBAR = "quickstartsSidebar"

const DEPLOYMENT_TO_SIDEBAR = {
  network: "quickstartsNetworkOnlySidebar",
  oel: "quickstartsOelSidebar",
  oss: "quickstartsOssSidebar",
}

function isGettingStartedOnlyPath(pathname) {
  if (!pathname) return false
  const p = pathname.replace(/^\/docs\/?/, "")
  return (
    p.startsWith("getting-started") &&
    !pathname.includes("/network/") &&
    !pathname.includes("/oel/") &&
    !pathname.includes("/oss/")
  )
}

function getQuickstartsSidebarForPath(pathname, deploymentFromContext) {
  if (isGettingStartedOnlyPath(pathname) && deploymentFromContext) {
    return DEPLOYMENT_TO_SIDEBAR[deploymentFromContext]
  }
  if (!pathname) return "quickstartsNetworkOnlySidebar"
  if (pathname.includes("/oel/") || pathname.includes("/self-hosted/oel/"))
    return "quickstartsOelSidebar"
  if (pathname.includes("/oss/")) return "quickstartsOssSidebar"
  return "quickstartsNetworkOnlySidebar"
}

function DocRootContent({
  docElement,
  sidebarName,
  sidebarItems,
  pathname,
  docsSidebars,
}) {
  const quickstartsDeployment = useQuickstartsDeployment()
  const deploymentFromContext = quickstartsDeployment?.deployment ?? "network"
  if (sidebarName === QUICKSTARTS_SIDEBAR) {
    const deploymentSidebarName = getQuickstartsSidebarForPath(
      pathname,
      isGettingStartedOnlyPath(pathname) ? deploymentFromContext : null,
    )
    if (docsSidebars[deploymentSidebarName]) {
      sidebarName = deploymentSidebarName
      sidebarItems = docsSidebars[deploymentSidebarName]
    }
  }
  return (
    <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
      <DocRootLayout>{docElement}</DocRootLayout>
    </DocsSidebarProvider>
  )
}

export default function DocRootWrapper(props) {
  const currentDocRouteMetadata = useDocRootMetadata(props)
  if (!currentDocRouteMetadata) {
    return <NotFoundContent />
  }
  const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata
  const pathname = props.location?.pathname ?? ""
  const versionMetadata = useDocsVersion() ?? {}
  const docsSidebars = versionMetadata.docsSidebars ?? {}

  return (
    <div id="route-identifier" data-route={pathname}>
      <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsDocPage)}>
        <QuickstartsDeploymentProvider>
          <DocRootContent
            docElement={docElement}
            sidebarName={sidebarName}
            sidebarItems={sidebarItems}
            pathname={pathname}
            docsSidebars={docsSidebars}
          />
        </QuickstartsDeploymentProvider>
      </HtmlClassNameProvider>
    </div>
  )
}
