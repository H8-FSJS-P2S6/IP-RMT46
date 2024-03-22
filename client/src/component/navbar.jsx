import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    }

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="flex flex-row">
                        <img src={logo} alt="logo" />
                        <Link to="/" className="btn btn-ghost text-xl">
                            PokeWorldDesu
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end mx-5">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="profile" src="https://cdn-icons-png.flaticon.com/512/64/64572.png" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>
                                    logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}