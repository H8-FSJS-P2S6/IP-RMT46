import { localRequest } from "../utils/axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { errorAlert, successToast } from "../utils/sweetAlert";

export default function UpdateJob() {
    const { burgerId } = useParams()
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        price: "",
        veg: "",
        images: ""
    })

    useEffect(() => {
        const fetchBurgers = async () => {
            try {
                let { data } = await localRequest({
                    url: `/burgers/${burgerId}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setFormData(data)
            } catch (error) {
                console.log(error.response?.data.message || error.message)
                errorAlert(err.response.data.message);
                setError(error)
            }
        }
        fetchBurgers()
    }, [burgerId]);

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let { data } = await localRequest({
                url: `/burgers/${burgerId}`,
                method: "put",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: formData
            })
            console.log(data)
            successToast("Burger successfully updated!");
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
                id="new-burger-section"
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Update Burger</h1>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form id="burger-form" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="burger-name">
                                    Name <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="burger-name"
                                    placeholder="Enter burger name"
                                    autoComplete="off"
                                    required=""
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="burger-desc">
                                    Description <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="burger-desc"
                                    placeholder="Enter burger description"
                                    autoComplete="off"
                                    required=""
                                    name="description"
                                    value={formData.desc}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="burger-price">
                                    Price <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="burger-price"
                                    placeholder="Enter price"
                                    autoComplete="off"
                                    required=""
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="burger-type">
                                    Veg <span className="text-danger fw-bold">*</span>
                                </label>
                                <select id="veg" className="form-select" required="" name="veg"
                                    value={formData.veg}
                                    onChange={handleChange}>
                                    <option value="" disabled="">
                                        -- Select Burger Type --
                                    </option>
                                    <option>True</option>
                                    <option>False</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="company-id">
                                    Image <span className="text-danger fw-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="image"
                                    placeholder="Enter image url"
                                    autoComplete="off"
                                    required=""
                                    name="Image"
                                    value={formData.images}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-6">
                                    <button
                                        className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                                        type="submit"
                                        href=""
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="col-6">
                                    <Link to="/adminpanel/burgers">
                                        <a className="btn btn-lg btn-light rounded-pill w-100 p-2" href="">
                                            Cancel
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}