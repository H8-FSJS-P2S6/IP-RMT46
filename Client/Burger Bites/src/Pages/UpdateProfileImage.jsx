import { localRequest } from "../utils/axios"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { errorAlert, successToast } from "../utils/sweetAlert";

export default function UpdateProfileImage() {
    const nav = useNavigate();
    const [user, setUser] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!image) {
            errorAlert(err.response.data.message);
            return;
        }
        try {
            const formData = new FormData()
            formData.append("image", image)
            let response = await localRequest({
                url: `/users/profile`,
                method: "patch",
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: formData
            })
            console.log(response.data)
            successToast("Image successfully updated!");
            nav("/profile")
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            errorAlert(err.response.data.message);
        } finally {
            nav("/profile")
        }
    }
    return (
        <>
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="update-image-section"
                data-aos="fade-up"
    data-aos-duration={1500}
            >
                <div className="row mt-3 justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="pt-3 pb-2 mb-3">
                            <form id="register-form" onSubmit={handleSubmit}>
                                <h1 className="h3 mb-3 display-1 text-center">Update Profile Image</h1>
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
                                    Update Profile Image
                                </button>
                                <Link to="/profile">
                                    
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