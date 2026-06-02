import React, { PropsWithChildren } from "react"
import { routes } from "./console-routes"
import { projectPaths, workspacesPaths } from "./console-nav-data"

type ConsoleLinkProps = {
  route: string
}

const flatConsolePaths = [...projectPaths, ...workspacesPaths].flatMap((p) => {
  return p.paths.map((sectionPath) => ({
    href: sectionPath.href,
    title: sectionPath.title,
    navSection: p.title,
  }))
})

/**
 * A component to render a standardized link to a sub page in the Ory Console
 *
 * The component takes a route in the form of an object accessor which is used to look up the route from the routes object.
 * The route is then used to look up the corresponding nav data object which contains the title and the section title.
 * This is used to render a link to the Ory Console with the correct section and title.
 *
 * Example usage:
 *
 * ```mdx
 * <ConsoleLink route="project.activity.events" />
 *
 * // Renders:
 * // Activity → Logs & Events in the [Ory Console](https://console.ory.com/current/projects/activity/events)
 * ```
 *
 * @param route a (possible nested) accesor from the routes object
 * @returns
 */
export default function ConsoleLink({ route }: ConsoleLinkProps) {
  const routeObj = route.split(".").reduce((p, c) => p[c], routes)
  if (!routeObj || (typeof routeObj !== "string" && !("route" in routeObj))) {
    throw new Error("Route not found: " + route)
  }

  let resolvedRoute: string
  if (typeof routeObj === "string") {
    resolvedRoute = routeObj
  } else if ("route" in routeObj) {
    resolvedRoute = routeObj.route
  } else {
    throw new Error(
      "Route object was found but it's neither a string nor an object containg a route: " +
        route +
        " " +
        JSON.stringify(routeObj),
    )
  }
  const navDataObj = flatConsolePaths.find((p) => p.href === resolvedRoute)
  if (!navDataObj) {
    throw new Error(
      "Route object does not have a corresponding nav entry: " + route,
    )
  }

  // TODO: add current project resolution via the console API
  const renderedRoute =
    "https://console.ory.com" + resolvedRoute.replace("[project]", "current")

  return (
    <>
      <strong>{navDataObj.navSection}</strong>
      {" → "}
      <strong>{navDataObj.title}</strong> in the{" "}
      <a href={renderedRoute} target="_blank" rel="noreferrer">
        Ory Console
      </a>
    </>
  )
}
