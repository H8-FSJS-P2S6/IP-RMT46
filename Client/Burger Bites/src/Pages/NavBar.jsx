import { Link } from "react-router-dom"

export default function NavBar() {
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
              <div className="ml-auto">
              <Link to="/profile">
                  <a className="nav-link">

                    <span className="icon material-symbols-outlined me-2">
                      person
                    </span>
                  </a>
                </Link>
              </div>
              <div className="ml-auto">
                <Link to="/login">
                  <button className="btn btn-primary custom-login-btn">
                    Login
                  </button>
                </Link>
              </div>
              <div className="ml-auto">
                <Link to="/adminpanel">
                <button className="icon material-symbols-outlined">
                  admin_panel_settings
                </button>
                </Link>
              </div>
            </ul>
          </div>
          <label htmlFor="show-search" className="search-icon">
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
          </form>
          <Link to="/cart">
          <button className="cart-button" style={{fontSize: "20px"}}>
      <i className="fas fa-shopping-cart cart-icon"></i>
    </button>
          </Link>
        </nav>
      </div>
      {/* Navbar End */}
    </>
  )
}