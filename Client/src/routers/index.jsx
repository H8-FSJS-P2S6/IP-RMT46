import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../views/ErrorPage";
import RegisterPage from "../views/RegisterPage";
import Public from "../views/PublicPage";
import Authentication from "../views/AuthenticationPage";
import PublicDetailPage from "../views/PublicDetailPage";
import AboutUs from "../views/AboutUs";
import ContactUs from "../views/ContactUs";
import LoginPage from "../views/LoginPage";
import User from "../views/UserProductPage";
import UserDetailPage from "../views/UserProductDetailPage";
import UserAboutUs from "../views/UserAboutUs";
import UserContactUs from "../views/UserContactUs";
import UserCart from "../components/UserCart";
import CheckOut from "../components/CheckOut";
import Done from "../components/Done";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        loader: () => {
            if(localStorage.token){
                return redirect("/products")
            }else{
                return null
            }
        },
        children: [
            {
                path: "/",
                element: <Public />
            },
            {
                path: "/publicDetail/:id",
                element: <PublicDetailPage />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <ContactUs />
            },
            
        ]
    },
    {
        path: "products",
        element: <Authentication />,
        loader: () => {
            if(!localStorage.token){
                return redirect("/login");
            }else{
                return null
            }
        },
        children: [
            {
                index: true,
                loader: () => {
                    return redirect("/products/product")
                }
            },
            {
                path: "product",
                element: <User />
            },
            {
                path: `productDetail/:id`,
                element: <UserDetailPage />
            },
            {
                path: "UserAbout",
                element: <UserAboutUs />
            },
            {
                path: "UserContact",
                element: <UserContactUs />
            },
            {
                path: "myCart",
                element: <UserCart />
            },
            {
                path: "checkout",
                element: <CheckOut />
            },
            {
                path: "done",
                element: <Done />
            }
        ]
    },

    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },

    // {
    //     path: "/products",
    //     element: <AuthenticationPage />,
    //     loader: () => {
    //         if(!localStorage.token){
    //             return redirect("/login");
    //         }else{
    //             return null
    //         }
    //     },
    //     children: [
    //         {
    //             index: true,
    //             loader: () => {
    //                 return redirect("/products/product")
    //             }
    //         },
    //          {
    //     ]
    // }
]);

export default router;