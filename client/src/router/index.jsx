import { createBrowserRouter, redirect } from "react-router-dom"
import LoginPage from "../views/LoginPage";
import NotFound from "../views/NotFound";
import RegisterPage from "../views/RegisterPage";

const router = createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            return localStorage.getItem('token') ? redirect('/login') : null
        }
    },
    {
        path: "/",
        loader: () => {
            return !localStorage.getItem('token') ? redirect('/login') : null
        },
        children: [
            {
                path: "/",
            },
            {
                path: "/hunt",
            },
            {
                path: "/shop",
            },
            {
                path: "/shop/top-up",
            },
            {
                path: "/pokedex",
            },
            {
                path: "/pokedex/detail",
            },
            {
                path: "/pokedex/:id/edit",
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />
    },
])


export default router;