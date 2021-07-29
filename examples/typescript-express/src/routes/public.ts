import {Response, Request} from "express";

// This route handles the public page.
export const handlePublic = (req: Request, res: Response) => res.render('public')

