import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Register({ handleOnRegister, handleChangeInput }) {
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
                            Please register first before you started.
                        </p>
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
                        <p className="text-gray-100">register your account</p>
                        <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="Username">
                                    Username<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <input
                                    onChange={handleChangeInput}
                                    type="text"
                                    name="username"
                                    id="Username"
                                    placeholder="Username"
                                    className="block w-full p-4 text-lg rounded-sm bg-black"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="email">
                                    Email<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <input
                                    onChange={handleChangeInput}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
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
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="password">
                                    Gender<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <select name='gender' onChange={handleChangeInput} id="gender" className="block w-full p-4 text-lg rounded-sm bg-black" defaultValue={""}>
                                    <option value={""} disabled>
                                        -- Select Category --
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="pb-2 pt-4">
                                <label className="flex justify-between mb-2" htmlFor="password">
                                    Age<span className="text-red-500 fw-bold">*</span>
                                </label>
                                <input
                                    onChange={handleChangeInput}
                                    className="block w-full p-4 text-lg rounded-sm bg-black"
                                    type="number"
                                    name="age"
                                    id="Age"
                                    placeholder="Age"
                                />
                            </div>
                            <div className="form-check flex justify-center mb-2">
                                <div>Do you have an account? <Link to="/login" className="text-blue-900">Login</Link></div>
                            </div>
                            <div className="px-4 pb-2 pt-4">
                                <button onClick={handleOnRegister} className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}