import { useNavigate, Link } from "react-router-dom"
import logo from "../assets/Logo.png"

export default function NavBar() {
  const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        nav("/login")
    }
  return (
    <>
      <div className="navbar">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <i className="fa-solid fa-bars" />
          </label>
          <div className="content">
            <div className="logo">
              <img src="./images/logo" alt="" />
            </div>
            <ul className="links">
            <li>
                <Link to="/">
                  <img src={logo} alt="" className="navbar-logo"/>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <a>About</a>
                </Link>

              </li>
              <li>
                <Link to="/orders">
                  <a>Order</a>
                </Link>

              </li>
              <li>
                <Link to="/reviews">
                  <a>Reviews</a>
                </Link>

              </li>
              <li>
                <Link to="/profile">
                  <button className="nav-link icon material-symbols-outlined me-2">person</button>
                </Link>

              </li>
              <li>
                <Link to="/adminpanel">
                <button className="icon material-symbols-outlined">
                  admin_panel_settings
                </button>
                </Link>

              </li>
              <li>
                <Link to="/cart">
                <button className="cart-button fas fa-shopping-cart cart-icon" style={{fontSize: "20px"}}></button>
                </Link>

              </li>
              <li>
                <Link to="/login">
                <button className="btn btn-primary custom-login-btn">
                    Login
                  </button>
                </Link>

              </li>
              <li>
                
                <button className="btn btn-danger" onClick={() => handleLogout()}>
                    Logout
                  </button>
                

              </li>

            </ul>
          </div>
          {/* <label htmlFor="show-search" className="search-icon">
            <i className="fas fa-search" />
          </label>
          <form action="#" className="search-box">
            <input
              type="text"
              placeholder="Type Something To Search..."
              required=""
            />
            <button type="submit" className="go-icon">
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </form> */}
          
        </nav>
      </div>
      {/* Navbar End */}
    </>
  )
}