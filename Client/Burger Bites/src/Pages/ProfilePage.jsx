import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { Link, useNavigate, Outlet } from "react-router-dom"

export default function ProfilePage() {
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
            <div className="card" style={{ width: "18rem" }} data-aos="fade-up"
    data-aos-duration={1500}>
                <img src={userData.imageUrl} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{userData.name}</h5>
                    <p className="card-text">
                        {userData.email}
                    </p>
                    <p className="card-text">
                        {userData.role}
                    </p>
                    <p className="card-text">
                        Updated at: {formatCreatedAt(userData.updatedAt)}
                    </p>
                    <Link to="/updateProfileImage">
                    <button className="btn btn-primary mt-3">Update Image</button>
                    </Link>
                </div>
            </div>

        </>
    )
}