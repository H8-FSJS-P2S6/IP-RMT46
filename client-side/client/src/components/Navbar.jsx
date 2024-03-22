import { useEffect } from "react";
import { Link } from "react-router-dom";
// import {wbm} from "wbm"



export default function Navbar() {

    // const fetchData = async () => {
    //     try {
    //         await wbm.start();

    //         const contacts = [
    //             { phone: '6285159001315', name: 'Bruno' },
    //         ];
    //         await wbm.send(contacts, 'Hey {{name}}');
    //         // Hey Bruno
    //         // Hey Will

    //         await wbm.send(['6285159001315'], 'Hey man');
    //         // Hey man
    //         // Hey man

    //         await wbm.end();

    //         wbm.start({ showBrowser: true, qrCodeData: true, session: false })
    //             .then(async qrCodeData => {
    //                 console.log(qrCodeData); // show data used to generate QR Code
    //                 await wbm.waitQRCode();
    //                 // waitQRCode() is necessary when qrCodeData is true
    //                 // ...
    //                 await wbm.end();
    //             }).catch(err => { console.log(err); });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])


    return (
        <>
            <nav className="navbar navbar-expand-lg mb-3" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">
                                    Navbar
                                </a> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/pub">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contents">
                                    Contents
                                </a>
                            </li>
                        </ul>
                        {/* <a href="https://wa.me/6283876657601"><img src="/wa_icon.png" alt="" style={{ width: '3%' }} /></a> */}

                        {/* <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={'/login'}>
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={'/register'}>
                                            Register
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={'/about'}>
                                            About us
                                        </Link>
                                    </li>
                                </ul>
                            </li> */}
                        {/* <li className="nav-item">
                                            <a className="nav-link disabled" aria-disabled="true">
                                                Disabled
                                            </a>
                                        </li> */}
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}