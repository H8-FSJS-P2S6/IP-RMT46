import { useState } from "react"
import { localRequest } from "../utils/axios"
import { errorAlert, successToast } from "../utils/sweetAlert";
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let { data } = await localRequest({
                url: "/register",
                method: "post",
                data: formData
            })
            successToast("Sign Up successful");
            navigate("/login")
        } catch (error) {
            console.log(error.response.data.message)
            errorAlert(err.response.data.message);
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (

        <>
            {/*--------------------- Main Container ------------------------*/}
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                {/*--------------------- Login Container ------------------------*/}
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    {/*------------------------- Left Box ---------------------------*/}
                    <div
                        className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                        style={{ background: "#103cbe" }}
                    >
                        <div className="featured-image mb-3">
                            <img
                                src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg"
                                className="img-fluid"
                                style={{ width: 250 }}
                            />
                        </div>
                        <p
                            className="text-white fs-2"
                            style={{
                                fontFamily: '"Courier New", Courier, monospace',
                                fontWeight: 600
                            }}
                        >
                            Become a member
                        </p>
                        <small
                            className="text-white text-wrap text-center"
                            style={{
                                width: "17rem",
                                fontFamily: '"Courier New", Courier, monospace'
                            }}
                        >
                            Join our community by signing up today and enhance your experience with us!
                        </small>
                    </div>
                    {/*------------------ ------ Right Box --------------------------*/}
                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <form id="login-form" onSubmit={handleSubmit}>
                                <div className="header-text mb-4">
                                    <h2>Taste the difference</h2>
                                    <p><b>Sign Up Today!</b></p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="login-name">Name</label>
                                    <label className="text-danger text-end fw-bold">*</label>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control form-control-lg bg-light fs-6"
                                        type="name"
                                        id="login-name"
                                        placeholder="Enter your name ..."
                                        autoComplete="off"
                                        required=""
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="login-email">Email</label>
                                    <label className="text-danger text-end fw-bold">*</label>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control form-control-lg bg-light fs-6"
                                        type="email"
                                        id="login-email"
                                        placeholder="Enter email address ..."
                                        autoComplete="off"
                                        required=""
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="login-password">Password</label>
                                    <label className="text-danger text-end fw-bold">*</label>
                                </div>
                                <div className="input-group mb-1">
                                    <input
                                        className="form-control form-control-lg bg-light fs-6"
                                        type={showPassword ? "text" : "password"}
                                        id="login-password"
                                        placeholder="Enter your password ..."
                                        autoComplete="off"
                                        required=""
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChangeInput}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                                            {showPassword ? "visibility_off" : "visibility"}
                                        </span>
                                    </button>
                                </div>
                                <div className="input-group mb-3 mt-3">
                                <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Sign Up</button>
                            </div>
                            </form>
                            <div className="input-group mb-3 d-flex justify-content-between"></div>
                            <div className="d-flex justify-content-center mt-4" style={{ display: "flex", justifyContent: "center" }}>
                                <div id="buttonDiv"></div>
                            </div>
                            <div className="row mb-2 d-flex justify-content-center">
                                <small className="text-center">
                                    Already a member?
                                    <Link to="/login">
                                        <b>Login</b>
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}