import { createBrowserRouter, redirect } from "react-router-dom"
import LoginPage from "../views/LoginPage";
import NotFound from "../views/NotFound";
import RegisterPage from "../views/RegisterPage";
import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../views/HomePage";
import PokedexPage from "../views/PokedexPage";
import PokedexDetail from "../views/PokedexDetailPage";
import PokedexEdit from "../views/PokedexEditPage";
import TopUpPage from "../views/TopUpPage";
import ShopPage from "../views/ShopPage";
import HuntPage from "../views/HuntPage";

const router = createBrowserRouter([
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            return localStorage.getItem('access_token') ? redirect('/login') : null
        }
    },
    {
        path: "/",
        element: <HomeLayout />,
        loader: () => {
            return !localStorage.getItem('access_token') ? redirect('/login') : null
        },
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/hunt",
                element: <HuntPage />
            },
            {
                path: "/shop",
                element: <ShopPage />
            },
            {
                path: "/top-up",
                element: <TopUpPage />
            },
            {
                path: "/pokedex",
                element: <PokedexPage />
            },
            {
                path: "/pokedex/:id/detail",
                element: <PokedexDetail />
            },
            {
                path: "/pokedex/:id/edit",
                element: <PokedexEdit />
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />
    },
])


export default router;