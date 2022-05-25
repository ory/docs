import { useLocation } from "react-router-dom"
import { capitalizeFirstLetter } from "@/helper"
import { AuthContainerProps } from "@/types"
// add your own background image here to show on the login page
// import backgroundImageSource from "@/static/authentication-background.png"

export const AuthContainer = ({ title, children }: AuthContainerProps) => {
  // get the current auth step from the url if not passed
  const location = useLocation()
  const step = location.pathname.split("/").pop()
  const capitlizedStep = step && capitalizeFirstLetter(step)

  return (
    <div className="h-screen flex">
      <div className="z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 shadow-auth">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="h-12 w-48">
              <img src="https://www.ory.sh/docs/img/logo-docs.svg" />
            </div>
            <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
              {title ? title : capitlizedStep}
            </h2>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        {/* <img
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImageSource}
          alt="authentication background"
        /> */}
      </div>
    </div>
  )
}
