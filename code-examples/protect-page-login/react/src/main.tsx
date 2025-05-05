import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
// import AppWithAPI from "./AppWithApi.tsx"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AppWithAPI msg="Ory + React + API Example" /> */}
    <App />
  </React.StrictMode>,
)
