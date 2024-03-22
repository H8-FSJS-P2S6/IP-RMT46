import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";


export default function HomeLayout() {
    return (
        <>
            <Navbar />
            <hr />
            <div className="flex">
                <div>
                    <Sidebar />
                </div>
                <div className="size-full h-screen">
                    <Outlet />
                </div>
            </div>
        </>
    )
}