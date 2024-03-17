import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import { Link } from "react-router-dom"
import Image from "../assets/about-img.png"
import Icon1 from "../assets/i1.png"
import Icon2 from "../assets/i2.png"
import Icon3 from "../assets/i3.png"

export default function Home() {
  const [burgerData, setBurgerData] = useState([])
  useEffect(() => {
    async function getBurgers() {
      
        try {
            const response = await localRequest.get(`/burgers`);
            setBurgerData(response.data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        
    }
    getBurgers()
}, []);

    return (
        <>
        {/* <NavBar /> */}
  {/* Home Section Start */}
  <section className="home" id="home">
    <div className="home-content" data-aos="fade-right">
      <h3>
        A Tasty Burger is What <br />
        You Deserve!
      </h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
        aliquid facere quod nulla aut rerum earum magnam minima laudantium
        magni.
      </p>
      <button id="btn">
        <a href="#our-menu">
          OUR MENU <i className="fa-solid fa-arrow-right" />
        </a>
      </button>
    </div>
    <div className="img" data-aos="fade-left">
      <img src={Image} alt="" />
    </div>
  </section>
  {/* Home Section End */}
  {/* Offer Section Start */}
  <section
    className="offer"
    id="offer"
    data-aos="fade-up"
    data-aos-duration={1500}
  >
    <div className="main-text">
      <h3>
        <span>What</span> We Serve
      </h3>
    </div>
    <div className="card-content" data-aos="fade-up">
      <div className="row">
        <img src={Icon1} alt="" />
        <div className="card-body">
          <h3>High Quality Burger</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod ipsam
            facilis voluptatem doloribus eligendi natus maxime eum aliquid
            dignissimos dicta?
          </p>
        </div>
      </div>
      <div className="row">
        <img src={Icon2} alt="" />
        <div className="card-body">
          <h3>Fresh and Premium Ingredients</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod ipsam
            facilis voluptatem doloribus eligendi natus maxime eum aliquid
            dignissimos dicta?
          </p>
        </div>
      </div>
      <div className="row">
        <img src={Icon3} alt="" />
        <div className="card-body">
          <h3>Locally Sourced Ingredients</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod ipsam
            facilis voluptatem doloribus eligendi natus maxime eum aliquid
            dignissimos dicta?
          </p>
        </div>
      </div>
    </div>
  </section>
  {/* Offer Section End */}
  {/* Our Menu Start */}
  <section className="our-menu" id="our-menu">
    <div className="heading">
      <h1>
        <span>Our</span> Burger Menu
      </h1>
    </div>
    {burgerData.map((burger) => (
    <div className="card-content" data-aos="fade-up" data-aos-duration={1500}>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src={burger.images} alt="Burger Image" />
          </div>
          <h3>
            {burger.name} <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <div className="container" style={{ width: "90%", height: "50px", margin: "auto" }}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <Link to={`/burgers/${burger.id}`}>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm ms-auto details-button"
                                    style={{ backgroundColor: "black", borderRadius: 15 }}
                                >
                                    Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    </div>
    ))}
  </section>
  {/* Our Menu End */}
  {/* Footer Start */}
  <footer>
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