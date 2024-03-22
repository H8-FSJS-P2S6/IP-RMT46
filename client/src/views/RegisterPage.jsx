import { useState } from "react";
import Register from '../component/register'
import axios from "../utils/axios";
import { useNavigate } from "react-router";
import showToast from "../utils/toast";

function RegisterPage() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
    })

    const handleChangeInput = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setNewUser({
            ...newUser,
            [key]: value,
        })

    }

    const handleOnRegister = async (event) => {
        event.preventDefault();

        try {
            await axios({
                url: "/register",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: newUser,
            });
            navigate('/login')
            showToast(`Welcome to Poke World Desu Trainer`);
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    };

    return (
        <>
            <Register handleChangeInput={handleChangeInput} handleOnRegister={handleOnRegister} />
        </>
    )
}

export default RegisterPage