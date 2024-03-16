import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./App.css";
// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import AdminDashboard from "../components/AdminDashboard";
import Category from "../components/Category";
import Artikel from "../components/Artikel";
import AddCategory from "../components/AddCategory";
import AddArtikel from "../components/AddArtikel";
import UpdateCategory from "../components/UpdateCategory";
import UpdateArtikel from "../components/UpdateArtikel";

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
    path: "/dashboard/artikel",
    element: <Artikel></Artikel>,
  },
  {
    path: "/dashboard/categories",
    element: <Category></Category>,
  },
  {
    path: "/dashboard/add-category",
    element: <AddCategory></AddCategory>,
  },
  {
    path: "/dashboard/add-artikel",
    element: <AddArtikel></AddArtikel>,
  },
  {
    path: "/dashboard/update-category/:id",
    element: <UpdateCategory></UpdateCategory>,
  },
  {
    path: "/dashboard/update-artikel/:id",
    element: <UpdateArtikel></UpdateArtikel>,
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
