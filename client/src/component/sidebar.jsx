import { Link, useNavigate } from "react-router-dom";
import hunt from "../assets/hunt.png"
import shop from "../assets/shop.png"
import pokedex from "../assets/pokedex.png"
import topup from "../assets/topup.png"
import logout from "../assets/logout.png"

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <>
            <nav className="flex flex-col bg-red-900 w-64 h-screen px-4 tex-gray-900 border border-red-900 ">
                <div className="flex flex-wrap mt-8">
                    <div className="w-1/2">
                        <img
                            src="https://randomuser.me/api/portraits/women/27.jpg"
                            className="mx-auto w-20 h-20 rounded-full"
                        />
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <span className="font-semibold text-white">Trainer</span>
                        <button onClick={() => navigate('/top-up')} className="btn btn-circle btn-warning mt-2">
                            Coins
                        </button>
                    </div>
                </div>
                <div className="mt-10 mb-4">
                    <ul className="ml-4">
                        <Link className="b-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" to="/hunt">
                            <span>
                                <img className="fill-current h-8 w-8" src={hunt} alt="hunt" />
                            </span>
                            <span className="ml-5">Hunt</span>
                        </Link>
                        <Link className="b-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" to="/shop">
                            <span>
                                <img className="fill-current h-8 w-8" src={shop} alt="shop" />
                            </span>
                            <span className="ml-5">Shop</span>
                        </Link>
                        <Link className="b-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" to="/pokedex">
                            <span>
                                <img className="fill-current h-8 w-8" src={pokedex} alt="pokedex" />
                            </span>
                            <span className="ml-5">Pokedex</span>
                        </Link>
                        <Link className="b-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg" to="/top-up">
                            <span>
                                <img className="fill-current h-8 w-8" src={topup} alt="topup" />
                            </span>
                            <span className="ml-5 mt-1">Top up</span>
                        </Link>
                        <button onClick={handleLogout} className="b-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded rounded-lg" to="/hunt">
                            <span>
                                <img className="fill-current h-10 w-10" src={logout} alt="logout" />
                            </span>
                            <span className="ml-5 mt-2">Logout</span>
                        </button>
                    </ul>
                </div>
            </nav>
        </>
    )
}