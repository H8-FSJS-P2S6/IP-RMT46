import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Detail() {
    const { burgerId } = useParams()
    const [burgerDetails, setBurgerDetails] = useState("")

    useEffect(() => {
        const fetchBurgerDetails = async () => {
            try {
                let response = await localRequest({
                    url: `/burgers?filter=${burgerId}`
                })
                setBurgerDetails(response.data[0])
                console.log(response.data)
            } catch (error) {
                console.log(error.response?.data.message || error.message)
                setError(error)
            }
        }
        fetchBurgerDetails()
    }, [burgerId]);

    return (
        <>
            <div className="row pb-5 mb-4 justify-content-center">
                <div className="col-lg-6 col-md-8 mb-4 mb-lg-0 mx-auto" data-aos="fade-up">

                    <div className="card rounded shadow-sm border-5">
                        <div className="card-body p-4">
                            <img
                                src={burgerDetails.images}
                                alt=""
                                className="img-fluid d-block mx-auto mb-3"
                            />
                            <h5>
                                {" "}
                                {burgerDetails.name}
                            </h5>
                            <p className="small text-muted font-italic">
                                {burgerDetails.desc}
                            </p>
                            <p className="small text-muted font-italic">
                                {burgerDetails.veg ? "Veg" : "Non-Veg"}
                            </p>
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                        </div>
                        <div className="container" style={{ width: "90%", height: "50px", margin: "auto" }}>
                            <div className="d-flex justify-content-center">
                                <div>
                                    <Link to={`/`}>
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