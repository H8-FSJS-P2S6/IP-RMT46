import { useNavigate, Link } from "react-router-dom"

export default function SideBar() {
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        nav("/login")
    }
    return (
        <>

            <nav
                className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
                id="sidebar-menu"
            >
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/adminpanel" className="nav-link" id="nav-job">

                                {" "}
                                <span class="icon material-symbols-outlined me-2">
                                    home
                                </span>
                                Home

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/adminpanel/burgers" className="nav-link" id="nav-job">

                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    lunch_dining
                                </span>
                                Burgers

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" href="" id="nav-category">

                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-browser" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" /><path d="M4 8l16 0" /><path d="M8 4l0 4" /></svg>
                                </span>
                                Public Site

                            </Link>
                        </li>
                    </ul>
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                        <span>Account</span>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <Link to="/adminpanel/adminprofile" className="nav-link">

                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    person
                                </span>
                                Hi, <span id="username">Admin</span>

                            </Link>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="" id="nav-logout" onClick={() => handleLogout()}>
                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    logout
                                </span>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>



        </>
    )
}