import { createBrowserRouter, redirect } from "react-router-dom"
import Home from "./views/Home"
import Public from "./views/Public"
import Login from "./components/Login"
import ContentPage from "./components/ContentPage"
import Register from "./components/Register"
import PublicDetail from "./views/PublicDetail"
import AboutUs from "./views/AboutUs"
import AddContent from "./views/AddContent"
import EditPage from "./components/EditPage"

const router = createBrowserRouter(
    [

        {
            path: '/',
            element: <Home />
        },
        {
            path: '/pub',
            element: <Public />
        },
        {
            path: '/pub/:id/:language',
            element: <PublicDetail />
        },
        {
            path: '/register',
            element: <Register />,
            loader: () => {
                return localStorage.getItem('access_token') ? redirect('/contents') : null
            }
        },
        {
            path: '/login',
            element: <Login />,
            loader: () => {
                return localStorage.getItem('access_token') ? redirect('/contents') : null
            }
        },
        {
            path: '/contents',
            element: <ContentPage />,
            loader: () => {
                return !localStorage.getItem('access_token') ? redirect('/login') : null
            }
        },
        {
            path: '/edit/:id',
            element: <EditPage />,
            loader: () => {
                return !localStorage.getItem('access_token') ? redirect('/login') : null
            }
        },
        {
            path: '/addContent',
            element: <AddContent />,
            loader: () => {
                return !localStorage.getItem('access_token') ? redirect('/login') : null
            }
        }
    ]
)

export default router