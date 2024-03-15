import { createBrowserRouter, redirect } from "react-router-dom";

import Login from "../Pages/LoginPage";
import SignUp from "../Pages/SignUpPage";
import About from "../Pages/AboutPage";
import Review from "../Pages/ReviewPage";
import Order from "../Pages/OrderPage";
// import CheckOut from "../Pages/CheckOutPage";
import AdminPanel from "../Pages/AdminPanel";
import Burger from "../Pages/BurgerTable";
import Home from "../Pages/HomePage";

import RootLayout from "../layouts/RootLayout";

import ErrorPage from "../Pages/ErrorPage.jsx";
import NotFound from "../Pages/NotFoundPage.jsx";

const router = createBrowserRouter([
    {
        path: "/signUp",
        element: <SignUp />,
        loader: () => {
            redirect("/login");
        }
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
        //     {
        //         path: "about",
        //         element: <About />,
        //         children: [
        //             {
        //                 path: "delete/:id",
        //                 element: <JobsTable />
        //             }
        //         ],

        //     },
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
    // {
    //     path: "/",
    //     element: <Home />,
    // },
    // {
    //     path: "/jobs/:id",
    //     element: <Detail />,
    // }
])

export default router;