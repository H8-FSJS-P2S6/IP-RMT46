import {RouterProvider} from "react-router-dom"
import router from "./router/index.jsx"
import { useEffect } from "react"
import AOS from "aos"

function App() {
    useEffect(() => {
        AOS.init();
    }, [])
    return <RouterProvider router={router}/>
}

export default App
