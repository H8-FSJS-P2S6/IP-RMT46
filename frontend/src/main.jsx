import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import AdminDashboard from "../components/AdminDashboard";


const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path: "/",
    element: <Home></Home>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
