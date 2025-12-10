import type { Request, Response } from "express"

const baseUrl = process.env.ORY_SDK_URL

export const refreshSessionHandler = (req: Request, res: Response) => {
  res.redirect(`${baseUrl}/ui/login?refresh=true`)
}


