import { localRequest } from "../utils/axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { errorAlert, successToast } from "../utils/sweetAlert";

export default function UpdateImage() {
    const { burgerId } = useParams()
    const nav = useNavigate();
    const [burger, setBurger] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchBurgerDetails = async () => {
            try {
                const response = await localRequest({
                    url: `burgers/${burgerId}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setBurger(response.data)
            } catch (error) {
                console.error("Error fetching job details:", error);
                setError("Error fetching job details")
            }
        }
        fetchBurgerDetails()
    }, [burgerId])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!image) {
            errorAlert("Please select an image to update.");
            return;
        }
        try {
            const formData = new FormData()
            formData.append("image", image)
            let response = await localRequest({
                url: `/burgers/${burgerId}/image`,
                method: "patch",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: formData
            })
            console.log(response.data)
            successToast("Image successfully updated!");
            nav("/adminpanel/burgers")
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            errorAlert(error.response.data.message);
        }
    }
    return (
        <>
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="update-image-section"
            >
                <div className="row mt-3">
                    <div className="col-12">
                        <h5 className="text-center">Burger Details</h5>
                        <p className="text-center"><b>Burger Name:</b> {burger.name}</p>
                        <div className="text-center">
                            <p><b>Current Burger Image:</b></p><img style={{ width: "100px", height: "100px" }} src={burger.images} alt="Burger Image" />
                        </div>
                    </div>
                </div><br />
                <div className="row mt-3 justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="pt-3 pb-2 mb-3">
                            <form id="register-form" onSubmit={handleSubmit}>
                                <h1 className="h3 mb-3 display-1 text-center">Update Burger Image</h1>
                                <div className="input-group mb-3">
                                    <input
                                        type="file"
                                        className="form-control pb-2"
                                        id="inputGroupFile02"
                                        autoComplete="off"
                                        required=""
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-lg btn-primary rounded-pill w-100 p-2 mt-3"
                                    type="submit"
                                >
                                    Update Burger Image
                                </button>
                                <Link to="/adminpanel/burgers">
                                    
                                    <a className="btn btn-lg rounded-pill w-100 p-2 btn-link">Cancel</a>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}