import { Outlet } from "react-router-dom";
import NavbarProduct from "../components/NavbarProduct";

export default function AuthenticationPage(){
    return(
        <>
        <NavbarProduct />
        <Outlet />
        </>
    )
}