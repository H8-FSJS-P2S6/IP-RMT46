import {RouterProvider} from "react-router-dom"
import router from "./router/index.jsx"
import { useEffect } from "react"
import AOS from "aos"
import {store} from "./store.js"
import {Provider} from "react-redux"

function App() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <Provider store={store}>
        <RouterProvider router={router}/>
        </Provider> 
    )
    
}

export default App
