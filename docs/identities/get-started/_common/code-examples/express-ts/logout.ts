import type { Request, Response } from "express"
import { ory } from "./sdk"

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const { logout_url } = await ory.createBrowserLogoutFlow({
      cookie: req.header("cookie") || "",
    })

    res.redirect(logout_url)
  } catch (error) {
    res.redirect("/")
  }
}


