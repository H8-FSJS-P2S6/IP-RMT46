import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { useEffect } from "react";
import axios from "axios"

export default function Login({ handleOnLogin, handleChangeInput }) {
    const navigate = useNavigate();
    const handleCredentialResponse = async ({ credential }) => {
        const { data } = await axios.post("https://poke-world-desu.wadesuuu.xyz/google-login", {
            googleToken: credential,
        })
        localStorage.setItem("access_token", data.access_token);
        navigate('/')
    };

    useEffect(() => {
        onload = () => {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_CLIENT_ID,
                callback: handleCredentialResponse,
            });

            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }
            );
        };

    }, [handleCredentialResponse]);

    return (
        <>
            <section className="min-h-screen flex items-stretch text-white ">
                <div
                    className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1709723680648-f0c0c2f36fb3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                    }}
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0" />
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">
                            Welcome to Poke World Desu
                        </h1>
                        <p className="text-3xl my-4">
                            Please login first before you started.
                        </p>
                    </div>
                    <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                        {/* <div id="buttonDiv"></div> */}
                    </div>
                </div>
                <div
                    className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                    style={{ backgroundColor: "#161616" }}
                >
                    <div
                        className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1709723680648-f0c0c2f36fb3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                        }}
                    >
                        <div className="absolute bg-black opacity-60 inset-0 z-0" />
                    </div>
                    <div className="w-full py-6 z-20">
                        <h1 className="my-10 flex justify-center">
                            <div className="">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="text-4xl mx-5">
                                Poke World Desu!
                            </div>
                        </h1>
                        <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="email">
                                    Email/Username<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <input
                                    onChange={handleChangeInput}
                                    type="text"
                                    name="credential"
                                    id="email"
                                    placeholder="Email/Username"
                                    className="block w-full p-4 text-lg rounded-sm bg-black"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="password">
                                    Password<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <input
                                    onChange={handleChangeInput}
                                    className="block w-full p-4 text-lg rounded-sm bg-black"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-check flex justify-center mb-2">
                                <div>Don't have an account yet? <Link to="/register" className="text-blue-900">Register</Link></div>
                            </div>
                            <div className="px-4 pb-2 pt-4">
                                <button onClick={handleOnLogin} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                    sign in
                                </button>
                            </div>
                            <p className="text-gray-100 my-5">- or use google account -</p>
                            <div className="flex justify-center">
                                <div id="buttonDiv"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}