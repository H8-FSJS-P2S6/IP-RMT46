import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const UserProductCard = ({ id, name, price, imageUrl, updatedAt, handleOnDetail }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        handleOnDetail(id);
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(`https://medshop.carloshakim.online/cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const isProductInCart = data.some((item) => item.Product.id === id);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddCoin = async (id) => {
        try {
            if (isProductInCart) {
                setIsAddedToCart(true);
                setTimeout(() => {
                    setIsAddedToCart(false);
                }, 2000);
                return;
            }
            let response = await axios.post(
                `https://medshop.carloshakim.online/cart`,
                { productId: id, userId: localStorage.getItem("userId") },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response);
            navigate("/products/myCart");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                    src={imageUrl}
                    className="w-full h-48 object-cover cursor-pointer"
                    alt="Product"
                    onClick={handleClick}
                />
                <div className="p-4">
                    <h5 className="text-lg font-semibold mb-2">{name}</h5>
                    <p className="text-gray-900 font-bold mb-4">{price}</p>
                    <div className="flex justify-center">
                        <Button
                            name={"Add to Cart"}
                            buttonClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                            buttonType={"submit"}
                            onClick={() => handleAddCoin(id)}
                            disabled={isProductInCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="bg-gray-100 p-4">
                    <small className="text-gray-500">Last updated {updatedAt}</small>
                </div>
            </div>
            {isAddedToCart && (
                <div className="bg-red-200 text-green-800 p-4 mb-4 rounded-md">
                    Product is already added to cart.
                </div>
            )}
        </div>
    );
};

export default UserProductCard;
