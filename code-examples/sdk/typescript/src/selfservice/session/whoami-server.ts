import { Configuration, FrontendApi } from "@ory/client"

const frontend = new FrontendApi(
  new Configuration({
    basePath: process.env.ORY_SDK_URL,
  }),
)

// a middleware function that checks if the user is logged in
// the user is loading a page served by express so we can extract the cookie from the
// request header and pass it on to Ory
// the cookie is only available under the same domain as the server e.g. *.myapp.com
function middleware(req: Request, res: Response, next: NextFunction) {
  // frontend is an instance of the Ory SDK
  // highlight-start
  frontend
    .toSession({ cookie: req.header("cookie") })
    .then(({ status, data: flow }) => {
      if (status !== 200) {
        next("/login")
      }
      next()
    })
  // highlight-end
  // ...
}
