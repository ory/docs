import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppWithAPI from './AppWithApi.tsx'
import './assets/main.css'

// Comment/uncomment to switch between components
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App msg="Ory + React Example" />
//   </React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithAPI msg="Ory + React + API Example" />
  </React.StrictMode>,
)