import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { errorAlert, successToast } from "../utils/sweetAlert";
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChangeInput = (event) => {
        const key = event.target.name
        const value = event.target.value

        setUserData({
            ...userData,
            [key]: value
        })
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let { data } = await localRequest({
                url: "/login",
                method: "post",
                data: userData
            })
            localStorage.setItem("token", data.access_token)
            successToast("Login success");
            navigate("/")
        } catch (error) {
            console.log(error.response.data.message)
            errorAlert(error.response.data.message);
        }
    }

    const handleCredentialResponse = async ({ credential }) => {
        const { data } = await localRequest.post("/google-login", {
            googleToken: credential
        })
        localStorage.setItem("token", data.token);
        console.log(data.message, "<<<<<")
        successToast(data.message);
        navigate("/")
    }

    useEffect(() => {

        google.accounts.id.initialize({
            client_id: "483160331749-3i3b3l3nvvostt3ccublhnmi64dtmkob.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog

    }, [])

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
                                    <h2>Hello, Again</h2>
                                    <p>We are happy to have you back.</p>
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
                                        autoComplete="email"
                                        required=""
                                        name="email"
                                        value={userData.email}
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
                                        autoComplete="current-password"
                                        required=""
                                        name="password"
                                        value={userData.password}
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
                                <div className="input-group mb-3 d-flex justify-content-between"></div>
                                <div className="input-group mb-3">
                                    <button type="submit" className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                                </div>
                            </form>
                            <div className="d-flex justify-content-center mt-4" style={{ display: "flex", justifyContent: "center" }}>
                                <div id="buttonDiv"></div>
                            </div>
                            <div className="row mt-4 mb-2 d-flex justify-content-center">
                                <small className="text-center">
                                    Don't have  an account?
                                    <Link to="/register">
                                        <b>Sign Up</b>
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