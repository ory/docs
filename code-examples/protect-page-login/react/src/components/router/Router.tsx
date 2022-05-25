import { lazy, Suspense } from "react"
import { Outlet, RouteObject, useRoutes, BrowserRouter } from "react-router-dom"
import { Routes } from "./Routes"
import { RouteGuard, Login } from "../pages"

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>

const LoggedIn = lazy(() => import("@/components/pages/LoggedIn"))
const Page404 = lazy(() => import("@/components/pages/404"))

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: Routes.root,
      element: (
        <RouteGuard>
          <LoggedIn />
        </RouteGuard>
      ),
      children: [
        {
          path: Routes.notFound,
          element: <Page404 />,
        },
      ],
    },
    {
      path: Routes.auth,
      element: <Outlet />,
      children: [
        {
          path: Routes.loginInitialize,
          element: <Login />,
        },
        {
          path: Routes.login,
          element: <Login />,
        },
        // {
        //   path: ROUTES.registrationInitialize,
        //   element: <Registration />,
        // },
        // {
        //   path: ROUTES.registration,
        //   element: <Registration />,
        // },
        // {
        //   path: ROUTES.recoveryInitialize,
        //   element: <Recovery />,
        // },
        // {
        //   path: ROUTES.recovery,
        //   element: <Recovery />,
        // },
        // {
        //   path: ROUTES.verificationInitialize,
        //   element: <Verification />,
        // },
        // {
        //   path: ROUTES.verification,
        //   element: <Verification />,
        // },
      ],
    },
  ]
  const element = useRoutes(routes)
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  )
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  )
}
