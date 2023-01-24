import { Configuration, FrontendApi, UiNode } from "@ory/client"
import {
  isUiNodeAnchorAttributes,
  isUiNodeImageAttributes,
  isUiNodeInputAttributes,
  isUiNodeScriptAttributes,
  isUiNodeTextAttributes,
} from "@ory/integrations/ui"
import express, { NextFunction, Request, Response } from "express"
import { engine } from "express-handlebars"

const frontend = new FrontendApi(
  new Configuration({
    basePath: process.env.ORY_SDK_URL,
  }),
)

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
      ...require("handlebars-helpers")(),
      toUiNodePartial: (node: UiNode) => {
        if (isUiNodeAnchorAttributes(node.attributes)) {
          return "ui_node_anchor"
        } else if (isUiNodeImageAttributes(node.attributes)) {
          return "ui_node_image"
        } else if (isUiNodeInputAttributes(node.attributes)) {
          switch (node.attributes.type) {
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
      },
    },
  }),
)

export function createLogin(req: Request, res: Response, next: NextFunction) {
  const { flow } = req.query
  return frontend
    .getLoginFlow({ id: flow, cookie: req.header("cookie") })
    .then(({ data: flow }) => {
      // Render the data using a view (e.g. Jade Template):
      res.render("auth", {
        ...flow,
      })
    })
}
