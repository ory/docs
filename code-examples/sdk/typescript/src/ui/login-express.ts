import {
  filterNodesByGroups,
  getNodeLabel,
  isUiNodeAnchorAttributes,
  isUiNodeImageAttributes,
  isUiNodeInputAttributes,
  isUiNodeScriptAttributes,
  isUiNodeTextAttributes,
} from "@ory/integrations/ui"
import express, { Request, Response } from "express"
import { engine } from "express-handlebars"

import { Configuration, FrontendApi, UiNode } from "@ory/client"

const apiBaseUrlInternal =
  process.env.KRATOS_PUBLIC_URL ||
  process.env.ORY_SDK_URL ||
  "http://localhost:4000"

export const apiBaseUrl = process.env.KRATOS_BROWSER_URL || apiBaseUrlInternal

// Sets up the SDK
let sdk = new FrontendApi(
  new Configuration({
    basePath: apiBaseUrlInternal,
  }),
)

const getUrlForFlow = (flow: string, query?: URLSearchParams) =>
  `${apiBaseUrl}/self-service/${flow}/browser${
    query ? `?${query.toString()}` : ""
  }`

const isQuerySet = (x: any): x is string =>
  typeof x === "string" && x.length > 0

const getUiNodePartialType = (node: UiNode) => {
  if (isUiNodeAnchorAttributes(node.attributes)) {
    return "ui_node_anchor"
  } else if (isUiNodeImageAttributes(node.attributes)) {
    return "ui_node_image"
  } else if (isUiNodeInputAttributes(node.attributes)) {
    switch (node.attributes && node.attributes.type) {
      case "hidden":
        return "ui_node_input_hidden"
      case "submit":
        return "ui_node_input_button"
      case "button":
        return "ui_node_input_button"
      case "checkbox":
        return "ui_node_input_checkbox"
      default:
        return "ui_node_input_default"
    }
  } else if (isUiNodeScriptAttributes(node.attributes)) {
    return "ui_node_script"
  } else if (isUiNodeTextAttributes(node.attributes)) {
    return "ui_node_text"
  }

  return "ui_node_input_default"
}
// This helper function translates the html input type to the corresponding partial name.
export const toUiNodePartial = (node: UiNode, comparison: string) => {
  console.log("toUiNodePartial", node, comparison)
  return getUiNodePartialType(node) === comparison
}

const app = express()

app.set("view engine", "hbs")

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    layoutsDir: `${__dirname}/../views/layouts/`,
    partialsDir: `${__dirname}/../views/partials/`,
    defaultLayout: "main",
    helpers: {
      onlyNodes: (nodes: any) => filterNodesByGroups({ nodes: nodes }),
      toUiNodePartial,
      getNodeLabel: getNodeLabel,
    },
  }),
)

app.get("/login", async (req: Request, res: Response) => {
  const { flow, aal = "", refresh = "", return_to = "" } = req.query

  const initFlowQuery = new URLSearchParams({
    aal: aal.toString(),
    refresh: refresh.toString(),
    return_to: return_to.toString(),
  })

  const initFlowUrl = getUrlForFlow("login", initFlowQuery)

  // The flow is used to identify the settings and registration flow and
  // return data like the csrf_token and so on.
  if (!isQuerySet(flow)) {
    res.redirect(303, initFlowUrl)
    return
  }

  // hightlight-start
  return sdk
    .getLoginFlow({
      id: flow,
      cookie: req.header("cookie"),
    })
    .then(({ data: flow }) => {
      const initRegistrationQuery = new URLSearchParams({
        return_to: return_to.toString(),
      })
      console.log({ flow })
      if (flow.requested_aal === "aal2") {
        return sdk
          .createBrowserLogoutFlow({
            cookie: req.header("cookie"),
          })
          .then(({ data: logoutFlow }) => {
            res.render("auth", {
              ...flow,
              signUpUrl: getUrlForFlow("registration", initRegistrationQuery),
              recoveryUrl: getUrlForFlow("recovery"),
              logoutUrl: logoutFlow.logout_url,
            })
            return
          })
      }
      // Render the data using a view (e.g. Jade Template):
      res.render("auth", {
        ...flow,
        signUpUrl: getUrlForFlow("registration", initRegistrationQuery),
        recoveryUrl: getUrlForFlow("recovery"),
      })
    })
    .catch((err) => {
      if (err.response?.status === 410) {
        res.redirect(303, initFlowUrl)
        return
      }
    })
  // hightlight-end
})

const port = Number(process.env.PORT) || 3001

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}`))
