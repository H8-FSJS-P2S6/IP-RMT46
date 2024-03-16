// import { Link } from "react-router-dom"
import { useState } from "react"
import { localRequest } from "../utils/axios"
import { errorAlert, successToast } from "../utils/sweetAlert";

export default function Card({ burgerId, name, desc, price, veg, images, title = "Add to Cart" }) {
    function formatCurrency(amount) {

        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });


        return formatter.format(amount);
    }

    const [quantity, setQuantity] = useState(0);

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        if (quantity > 0) {
            try {
                const response = await localRequest.post(`/cart/${burgerId}`, { quantity });
                console.log("Added to cart:", response.data);
                successToast(`${name} Burger successfully added to cart!`);
                
            } catch (error) {
                console.error("Error adding to cart:", error);
                errorAlert(error.response.data.message);
                
            }
        } else {
            console.log("Quantity should be greater than 0");
            errorAlert("Quantity should be greater than 0");
            
        }
    };

    return (
        <>
            <div className="card-content" data-aos="fade-up" data-aos-duration={1500}>
                <div className="row zoom-card">
                    <div className="card-body">
                        <div className="img">
                            <img src={images} alt="Burger Image" />
                        </div>
                        <h3>
                            {name} <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                            <i className="fa-solid fa-star" />
                        </h3>
                        <p>
                            {desc}
                        </p>
                        <p>
                            {veg ? "Veg" : "Non-Veg"}
                        </p>
                        <h5>
                            {formatCurrency(price)} <button className="custom-login-btn" style={{ height: "100%" }} onClick={handleAddToCart}>{title}</button>
                        </h5>
                        <input
                            type="number"
                            className="quantity-input mt-2"
                            value={quantity}
                            onChange={handleInputChange}
                            placeholder="quantity"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}