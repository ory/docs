import type { Request, Response } from "express"
import { ory } from "./sdk"

export const signUpHandler = (req: Request, res: Response) => {
  ory
    .toSession({ cookie: req.header("cookie") || "" })
    .then((session) => res.json(session))
    .catch(() => {
      res.redirect(
        `${process.env.ORY_SDK_URL}/self-service/registration/browser`,
      )
    })
}


