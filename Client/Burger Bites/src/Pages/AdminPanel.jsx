import { useNavigate, Link } from "react-router-dom"

export default function SideBar() {
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        nav("/login")
    }
    return (
        <>
        <div className="row">
        <nav
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            id="sidebar-menu"
        >
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/cms/jobs">
                            <a className="nav-link" id="nav-job">
                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    lunch_dining
                                </span>
                                Burgers
                            </a>
                        </Link>
                    </li>
                    {/* <li className="nav-item"> */}
                        {/* <Link to="/cms/companies"> */}
                            {/* <a className="nav-link" id="nav-category">
                                {" "}
                                <span className="icon material-symbols-outlined me-2">
                                    category
                                </span>
                                Companies
                            </a> */}
                        {/* </Link> */}
                    {/* </li> */}
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span>Account</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link">
                            {" "}
                            <span className="icon material-symbols-outlined me-2">
                                person
                            </span>
                            Hi, <span id="username">Admin</span>
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="" id="nav-logout" onClick={handleLogout}>
                            {" "}
                            <span className="icon material-symbols-outlined me-2">
                                logout
                            </span>
                            Logout
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="" id="nav-logout">
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
        <div className="col-md-9 col-lg-10 ms-sm-auto pt-5 ps-3">
                <h1>Welcome to the Burger Bites Admin Panel</h1>
            </div>
        </div>
        <footer className="fixed-bottom">
    <div className="footer-content">
      <div className="copyright">
        <p>
          &copy; Copyright <strong>Burger Bites</strong>. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
        </>
    )
}