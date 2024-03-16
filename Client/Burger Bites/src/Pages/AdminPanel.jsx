import SideBar from "./SideBar"

export default function AdminPanel() {
    return (
        <>
        <SideBar />
        <div className="row">
        <div className="col-md-9 col-lg-10 ms-sm-auto pt-20 ps-3">
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