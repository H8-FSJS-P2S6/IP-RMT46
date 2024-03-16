import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [showDeleteNotification, setShowDeleteNotification] = useState(false);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userData = await axios.get(`https://medshop.carloshakim.online/cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(userData);
                setCartItems(userData.data);
                setQuantities(
                    userData.data.reduce((acc, cart) => {
                        acc[cart.id] = cart.quantity;
                        return acc;
                    }, {})
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [isDeleted, showDeleteNotification, showUpdateNotification]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://medshop.carloshakim.online/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setIsDeleted(true);
            setShowDeleteNotification(true);
            setTimeout(() => {
                setShowDeleteNotification(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: value,
        });
    };

    const handleUpdateQuantity = async (id) => {
        try {
            await axios.put(
                `https://medshop.carloshakim.online/cart/${id}`,
                { quantity: quantities[id] },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setIsDeleted(true);
            setShowUpdateNotification(true);
            setTimeout(() => {
                setShowUpdateNotification(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckout = () => {
        navigate("/products/checkout");
    };

    return (
        <div className="container">
            {showDeleteNotification && (
                <div className="bg-red-200 text-red-800 p-4 mb-4 rounded-md">
                    Item deleted from cart.
                </div>
            )}
            {showUpdateNotification && (
                <div className="bg-green-200 text-green-800 p-4 mb-4 rounded-md">
                    Cart updated successfully.
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Your Cart</h1>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleCheckout}>Checkout</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cartItems.map((cart) => (
                    <div className="bg-white rounded-lg shadow-lg" key={cart.Product.id}>
                        <img src={cart.Product.imageUrl} className="w-full h-48 object-cover rounded-t-lg" alt={cart.Product.name} />
                        <div className="p-4">
                            <h5 className="text-lg font-semibold mb-3">{cart.Product.name}</h5>
                            <p className="text-gray-600 mb-3">{cart.Product.price}</p>
                            <div className="flex justify-between items-center">
                                <input
                                    type="number"
                                    className="border rounded-md p-2"
                                    value={quantities[cart.id]}
                                    onChange={(e) => handleQuantityChange(cart.id, e.target.value)}
                                />
                                <div>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={() => handleUpdateQuantity(cart.id)}>Update</button>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => handleDelete(cart.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
