import { createBrowserRouter, redirect } from "react-router-dom";

import Login from "../Pages/LoginPage";
import Register from "../Pages/Register";
import About from "../Pages/AboutPage";
import Review from "../Pages/ReviewPage";
import Order from "../Pages/OrderPage";
import ProfilePage from "../Pages/ProfilePage";
import UpdateProfileImage from "../Pages/UpdateProfileImage.jsx";
import CheckOut from "../Pages/CheckOutPage";
import AdminPanel from "../Pages/AdminPanel";
import BurgerTable from "../Pages/BurgerTable";
import Home from "../Pages/HomePage";
import AddBurgerForm from "../Pages/AddBurgerForm.jsx";
import EditBurgerForm from "../Pages/EditBurgerForm.jsx";
import UpdateBurgerImage from "../Pages/UpdateBurgerImage.jsx";

import RootLayout from "../layouts/RootLayout";

import ErrorPage from "../Pages/ErrorPage.jsx";
// import NotFound from "../Pages/NotFoundPage.jsx";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />,
        // loader: () => {
        //     redirect("/login");
        // }
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            return localStorage.getItem("token") ? redirect("/") : null;
        }
    },
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: () => {
            return !localStorage.getItem("token") ? redirect("/login") : null;
        },
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />,

            },
            {
                path: "reviews",
                element: <Review />,

            },
            {
                path: "orders",
                element: <Order />,

            },
            {
                path: "profile",
                element: <ProfilePage />,

            },
            {
                path: "updateProfileImage",
                element: <UpdateProfileImage />,

            },
            {
                path: "cart",
                element: <CheckOut />

            },
        //     {


        //         path: "add",
        //         element: <AddJob />,
        //     },
        //     {
        //         path: "update/:id",
        //         element: <UpdateJob />,
        //     },
        //     {
        //         path: "updateImgUrl/:id",
        //         element: <UpdateImage />,
        //     },
        //     {
        //         path: "companies",
        //         element: <CompaniesTable />,
        //         children: [
        //             {
        //                 path: "add",
        //                 element: <AddCompany />,
        //             },
        //             {
        //                 path: "update",
        //                 element: <CompaniesTable />,
        //             }
        //         ]
        //     },
        //     {
        //         path: "users",
        //         element: <AddUser />
        //     }
        ]
    },
    {
        path: "/adminpanel",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: () => {
            return !localStorage.getItem("token") ? redirect("/login") : null;
        },
        children: [
            {
                path: "",
                element: <AdminPanel />
            },
            {
                path: "burgers",
                element: <BurgerTable />,
                children: [
                    {
                        path: "delete/:burgerId",
                        element: <BurgerTable />
                    }
                ],

            },
            {


                path: "add",
                element: <AddBurgerForm />,
            },
            {
                path: "update/:burgerId",
                element: <EditBurgerForm />,
            },
            {
                path: "updateImgUrl/:burgerId",
                element: <UpdateBurgerImage />,
            },
            {
                path: "adminprofile",
                element: <ProfilePage />,
            },
        ]
    }
    // {
    //     path: "/jobs/:id",
    //     element: <Detail />,
    // }
])

export default router;