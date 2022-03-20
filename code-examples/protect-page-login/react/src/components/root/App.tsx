import { AuthProvider } from "@/components/contexts"
import { ToastContainer } from "react-toastify"
import { Router } from "../router/Router"
import "react-toastify/dist/ReactToastify.min.css"

export const App = () => {
  return (
    <AuthProvider>
      <main>
        <ToastContainer
          autoClose={3000}
          position="top-right"
          draggable
          newestOnTop
          closeOnClick
          pauseOnHover
        />
        <Router />
      </main>
    </AuthProvider>
  )
}
