import { useNavigate } from "react-router-dom";
import { useState } from "react";
import serverRequest from "../utils/axios";
import Toastify from "../utils/toast";
import Button from "./Button";
import { Link } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const onHandleRegister = async (e) => {
        e.preventDefault();
        try {
            let { data } = await serverRequest({
                method: "POST",
                url: "/register",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: userData,
            });
            navigate("/login");
            Toastify(`Successfully register ${data.username}`, "success");
        } catch (error) {
            Toastify(
                error.response?.data?.message || error.message,
                "error"
            );
        }
    };

    const onChangeRegister = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [key]: value });
    };

    return (
        <section className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold mb-8">Register User</h1>
            <Button
            name={"Back"}
            buttonType={"submit"}
            buttonClass={"bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"}
            onClick={() => navigate("/login")}>

            </Button>
            <form
                id="register-form"
                className="w-full max-w-lg px-8 py-6 bg-white shadow-md rounded-lg"
            >
                <div className="mb-4">
                    <label
                        htmlFor="register-username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-input w-full px-4 py-2 border rounded-md"
                        id="register-username"
                        placeholder="Enter username ..."
                        autoComplete="off"
                        required=""
                        name="username"
                        onChange={onChangeRegister}
                        value={userData.username}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="register-email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-input w-full px-4 py-2 border rounded-md"
                        id="register-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        required=""
                        onChange={onChangeRegister}
                        name="email"
                        value={userData.email}
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="register-password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                        
                    >
                        Password
                    </label>
                    <input
                    
                        type="password"
                        className="form-input w-full px-4 py-2 border rounded-md"
                        id="register-password"
                        placeholder="Enter password ..."
                        autoComplete="off"
                        required=""
                        value={userData.password}
                        name="password"
                        onChange={onChangeRegister}
                    />
                </div>
                <div className="flex justify-center">
                <Button
                    buttonClass={"bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"}
                    name={"Register"}
                    onClick={onHandleRegister}
                    >
                    Register
                </Button>
                </div>
                <p className="mt-3 text-center text-red-500 ">
                            Already Have an Account? <Link to={"/login"}>Login</Link>
                        </p>
            </form>
        </section>
    );
}
