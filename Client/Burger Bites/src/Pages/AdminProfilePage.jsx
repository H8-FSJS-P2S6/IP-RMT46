import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { Link, useNavigate, Outlet } from "react-router-dom"

export default function AdminProfilePage() {
    function formatCreatedAt(updatedAt) {
        const date = new Date(updatedAt);
        return date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const fetchUser = async () => {
        setLoading("Loading...")
        setError("")
        try {
            let { data } = await localRequest({
                url: "/users",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUserData(data)
            console.log(data)
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    if (error) {
        return <h3>{error.message ?? error}</h3>
    }

    if (loading) {
        return <h3>Loading...</h3>
    }
    return (
        <>
        <div className="row pb-5 mb-4 justify-content-center">
                <div className="col-lg-6 col-md-8 mb-4 mb-lg-0 mx-auto" data-aos="fade-up" data-aos-duration={1500}>

                    <div className="card rounded shadow-sm border-5">
                        <div className="card-body p-4">
                            <img
                                src={userData.imageUrl}
                                alt=""
                                className="img-fluid d-block mx-auto mb-3"
                            />
                            <h5 className="card-title">
                                
                                {userData.name}
                            </h5>
                            <p className="card-text">
                        {userData.email}
                    </p>
                    <p className="card-text">
                        {userData.role}
                    </p>
                    <p className="card-text">
                        Updated at: {formatCreatedAt(userData.updatedAt)}
                    </p>
                    <Link to="/adminpanel/updateAdminProfileImage">
                    <button className="btn btn-primary mt-3">Update Image</button>
                    </Link>
                        </div>
                        <div className="container" style={{ width: "90%", height: "50px", margin: "auto" }}>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <Link to="/adminpanel">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm ms-auto details-button"
                                            style={{ backgroundColor: "black", borderRadius: 15 }}
                                        >
                                            Back
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}