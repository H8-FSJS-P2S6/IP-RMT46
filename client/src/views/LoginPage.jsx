import { useNavigate } from "react-router";
import Login from "../component/login";
import { useState } from "react";
import showToast from "../utils/toast";
import axios from "../utils/axios";

function LoginPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        credential: "",
        password: "",
    })

    const handleChangeInput = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setUserData({
            ...userData,
            [key]: value,
        })

    }

    const handleOnLogin = async (event) => {
        event.preventDefault();

        try {
            let { data } = await axios({
                url: "/login",
                method: "POST",
                data: userData,
            })
            localStorage.setItem('access_token', data.access_token);
            navigate('/')
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    }

    return (
        <>
            <Login handleChangeInput={handleChangeInput} handleOnLogin={handleOnLogin} />
        </>
    )
}

export default LoginPage;
