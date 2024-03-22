import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import FacebookLogin from "./FacebookLogin"
import Navbar from "./Navbar"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    let errorMessage

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://project.mf-cyberse.online/auth/login', {
                email, password
            })

            localStorage.setItem('access_token', response.data.access_token)
            console.log(response.data)

            navigate('/contents')
        } catch (error) {
            // console.log(error)
            errorMessage = error.response.data.message
            console.log(errorMessage)
        }
    }

    const handleCredentialResponse = async ({ credential }) => {

        const response = await axios.post("https://project.mf-cyberse.online/auth/google-login", {
            googleToken: credential,
        })

        localStorage.setItem("access_token", response.data.access_token)

        // successToast(data.message)
        navigate("/contents")
    }

    useEffect(() => {
        // function handleCredentialResponse(response) {
        //     console.log("Encoded JWT ID token: " + response.credential);
        // }
        google.accounts.id.initialize({
            client_id: "858791502347-r5k521fubb95qopf2oue5m5ap13h2l7k.apps.googleusercontent.com",
            callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }
        )
    }, [])

    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center" style={{ marginTop: '5%' }}>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="your@mail.com"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                // console.log(email)
                            }}
                        />
                        <div id="emailHelp" className="form-text">
                            Input your email.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="yourpassword123"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                // console.log(password)
                            }}
                        />
                        <div id="passwordHelp" className="form-text">
                            Input your Password.
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center" style={{ padding: '2%' }}>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Log in
                            </button>
                        </div>
                        <div style={{ marginBottom: '3%', marginLeft: '2%' }}>
                            <Link to='/pub'><button className="btn btn-outline-danger">
                                Cancel
                            </button></Link>
                        </div>
                    </div>
                    Don't have an account? <Link to='/register'>Register First!</Link> <br />
                    or Login with:
                    <hr />
                    <div className="d-flex justify-content-center" style={{ alignItems: 'center' }}>
                        <div id="buttonDiv"></div>
                    </div>
                    <div className="d-flex justify-content-center" style={{ alignItems: 'center' }}>
                        <FacebookLogin />
                    </div>
                </form>
            </div>

        </>
    )
}