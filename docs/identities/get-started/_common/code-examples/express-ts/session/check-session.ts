import type { Request, Response, NextFunction } from "express"
import { ory } from "../sdk"

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await ory.toSession({
      cookie: req.header("cookie") || "",
    })
    // @ts-expect-error attach session for downstream handlers
    req.session = session
    next()
  } catch (error) {
    res.redirect(`${process.env.ORY_SDK_URL}/self-service/login/browser`)
  }
}


