import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { errorAlert, successToast } from "../utils/sweetAlert";
import SideBar from "./SideBar";

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

    const [burgersData, setBurgersData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const fetchBurgers = async () => {
        setLoading("Loading...")
        setError("")
        try {
            let { data } = await localRequest({
                url: "/burgers",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBurgersData(data)
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
                url: `/burgers/${burgerId}`,
                method: "delete",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBurgersData(burgersData.filter((burger) => burger.id !== burgerId))
            console.log(data)
            successToast("Burger deleted successfully");
        } catch (error) {
            console.log(error.response?.data.message || error.message)
            errorAlert("Unable to delete Burger");
            setError(error)
        }
    }

    useEffect(() => {
        fetchBurgers()
    }, []);

    if (error) {
        return <h3>{error.message ?? error}</h3>
    }

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <>
        <SideBar />
            {/* <Outlet /> */}
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="burger-section"
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Burgers</h1>
                    <Link to="/adminpanel/add">
                        <button className="btn btn-primary rounded-pill" id="new-burger">
                            <span className="icon material-symbols-outlined">add</span>New Burger
                        </button>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table align-middle table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" width="180px">
                                        Description
                                    </th>
                                    <th scope="col" width="250px">
                                        Price
                                    </th>
                                    <th scope="col">Veg</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Updated At</th>
                                    <th scope="col" width="50px">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-burger">
                                {burgersData.map((burger, index) => (
                                    <tr key={burger.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td className="fw-bold">{burger.name}</td>
                                        <td>
                                            {burger.desc}
                                        </td>
                                        <td>{formatCurrency(burger.price)}</td>
                                        <td>{burger.veg.toString()}</td>
                                        <td>
                                            <img
                                                src={burger.images}
                                                className="img-fluid"
                                            />
                                        </td>
                                
                                        
                                        <td className="fw-bold">{formatCreatedAt(burger.createdAt)}</td>
                                        <td className="fw-bold">{formatCreatedAt(burger.updatedAt)}</td>
                                        <td>
                                            <span className="d-flex">
                                                <a href="" className="ms-3" onClick={(e) => {
                                                    e.preventDefault();
                                                    deleteBurger(burger.id)}}>
                                                    <span className="icon material-symbols-outlined text-danger">
                                                        delete
                                                    </span>
                                                </a>
                                                <Link to={`/adminpanel/update/${burger.id}`}>
                                                    <a href="" className="ms-3">
                                                        <span className="icon material-symbols-outlined text-primary">
                                                            edit
                                                        </span>
                                                    </a>
                                                </Link>
                                                <Link to={`/adminpanel/updateImgUrl/${burger.id}`}>
                                                    <a href="" className="ms-3">
                                                        <span className="icon material-symbols-outlined text-success">
                                                            image
                                                        </span>
                                                    </a>
                                                </Link>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}