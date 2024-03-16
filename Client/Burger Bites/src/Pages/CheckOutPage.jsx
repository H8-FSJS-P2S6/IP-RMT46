import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { errorAlert, successToast } from "../utils/sweetAlert";

export default function BurgerTable() {
    function formatCreatedAt(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    function formatCurrency(amount) {

        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        });


        return formatter.format(amount);
    }

    const [cartData, setCartData] = useState([])
    const [burgerData, setBurgerData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [purchased, setPurchased] = useState(false);
    const [transactionToken, setTransactionToken] = useState("");

    const navigate = useNavigate()

    const fetchCart = async () => {
        setLoading("Loading...")
        setError("")
        try {
            let { data } = await localRequest({
                url: "/cart",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setCartData(data)
            console.log(data)
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchBurgers = async () => {
        setLoading("Loading...")
        setError("")
        try {
            let { data } = await localRequest({
                url: "/burgers",
            })
            setBurgerData(data)
            console.log(data)
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteBurger = async (burgerId) => {
        try {
            let { data } = await localRequest({
                url: `/cart/${burgerId}`,
                method: "delete",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setCartData(cartData.filter((cart) => cart.BurgerId !== burgerId))
            console.log(data)
            successToast("Burger removed from cart");
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            errorAlert("Unable to delete Burger");
            setError(error)
        }
    }

    useEffect(() => {
        fetchCart()
        fetchBurgers()
    }, []);

    useEffect(() => {
        if (purchased) {
            console.log("Burgers purchased");
        }
    }, [purchased]);

    if (error) {
        return <h3>{error.message ?? error}</h3>
    }

    if (loading) {
        return <h3>Loading...</h3>
    }

    const totalPrice = cartData.reduce((acc, cart) => {
        const burger = burgerData.find((burger) => burger.id === cart.BurgerId);
        return acc + burger.price * cart.quantity;
    }, 0);

    const handleCheckout = async () => {
        try {
            // await localRequest({
            //     url: "/cart/purchase",
            //     method: "patch",
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("token")}`
            //     }
            // });
            const {data} = await localRequest({
                url: "/cart/generateMidTransToken",
                method: "post",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                data: {
                    totalPrice: totalPrice // Pass the totalPrice to the backend
                }
            });
            console.log(data.token, "<<<<<<<<<<<<<<<<<<,")
            // setTransactionToken(data.token)
            window.snap.pay(data.token, {
                onSuccess: function(result){
                  /* You may add your own implementation here */
                  alert("payment success!"); console.log(result);
                },
                onPending: function(result){
                  /* You may add your own implementation here */
                  alert("wating your payment!"); console.log(result);
                },
                onError: function(result){
                  /* You may add your own implementation here */
                  alert("payment failed!"); console.log(result);
                },
                onClose: function(){
                  /* You may add your own implementation here */
                  alert('you closed the popup without finishing the payment');
                },
                
                
              })
            // successToast("Burgers have been purchased");
            // setCartData([]);
            setPurchased(true);
        } catch (error) {
            console.log(error.response?.data.message || error.message);
            errorAlert("Unable to purchase Burgers");
        }
    };

    return (
        <>
            {/* <Outlet /> */}
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="burger-section"
                data-aos="fade-up"
                data-aos-duration={1500}
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">My Cart</h1>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table align-middle table-bordered table-striped">
                            <thead>
                                <tr>

                                    <th scope="col">Name</th>
                                    <th scope="col" width="180px">
                                        Description
                                    </th>
                                    <th scope="col" width="250px">
                                        Price
                                    </th>
                                    <th scope="col">Burger Type</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Quantity</th>

                                    <th scope="col">Updated At</th>
                                    <th scope="col" width="50px">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-burger">
                                {cartData.map((cart) => {
                                    const burger = burgerData.find((burger) => burger.id === cart.BurgerId)
                                    return (
                                        <tr key={cart.id}>

                                            <td className="fw-bold">{burger.name}</td>
                                            <td>
                                                {burger.desc}
                                            </td>
                                            <td>{formatCurrency(burger.price)}</td>
                                            <td>{burger.veg ? "Veg" : "Non-Veg"}</td>
                                            <td>
                                                <img
                                                    src={burger.images}
                                                    className="img-fluid"
                                                />
                                            </td>
                                            <td>
                                                {cart.quantity}
                                            </td>

                                            <td className="fw-bold">{formatCreatedAt(burger.updatedAt)}</td>

                                            <td>
                                                <span className="d-flex">
                                                    <a href="" className="ms-3" onClick={(e) => {
                                                        e.preventDefault();
                                                        deleteBurger(cart.BurgerId)
                                                    }}>
                                                        <span className="icon material-symbols-outlined text-danger">
                                                            delete
                                                        </span>
                                                    </a>

                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        {!purchased && (
                            <>
                                <h4>Total Price: {formatCurrency(totalPrice)}</h4>
                                <button
                                    className="btn btn-primary ms-5"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                                <Link to ="/orders">
                        <button className="btn btn-danger ms-2">Cancel</button>
                        </Link>
                            </>
                        )}
                        {purchased && (
                            <Link to="/orders">
                                <button className="btn btn-primary ms-2">Back to Orders</button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}