import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

export default function Register() {
    // const [newUser, setNewUser] = useState({})
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // console.log(newUser)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://project.mf-cyberse.online/auth/register', {
                username, email, password
            })

            console.log(response.data)
            // console.log(newUser)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center" style={{ marginTop: '12%' }}>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername1" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername1"
                            aria-describedby="emailHelp"
                            autoComplete="false"
                            name="username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                                console.log({ username })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            autoComplete="false"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                console.log({ email })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            autoComplete="false"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                console.log({ password })
                            }}
                        />
                    </div>

                    <button style={{marginBottom: '2%'}} type="submit" className="btn btn-outline-primary">
                        Submit
                    </button> <br />
                    Already have an account?<Link to='/login'>Log in here!</Link>
                </form>

            </div>
        </>
    )
}