import { Outlet } from "react-router-dom"

import NavBar from "../Pages/NavBar"


export default function RootLayout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}