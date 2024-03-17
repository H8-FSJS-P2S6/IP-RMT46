import { useEffect } from "react"
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {getBurgers} from "../features/burger/burgerSlice"

export default function Order() {
    const dispatch = useDispatch()
    const burgerData = useSelector((state) => state.burgerData.list);
    const loading = useSelector((state) => state.burgerData.loading);
    console.log(burgerData)
    
    useEffect(() => {
        dispatch(getBurgers())

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
      if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
      ) {
        dispatch(getBurgers())
      }
  };

    return (
        <>
  {/* Offer Section Start */}
  <section
    className="offer"
    id="offer"
    data-aos="fade-up"
    data-aos-duration={1500}
  >
    <div className="main-text">
      <h3>
        <span>Order</span> Now!
      </h3>
    </div>
    <div className="card-content">
      <div className="row">
        <img src="./images/i1.png" alt="" />
        <div className="card-body">
          <h3>High Quality Burger</h3>
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
        <Card
        key={burger.id}
        burgerId={burger.id}
        id={burger.id}
        name={burger.name}
        desc={burger.desc}
        price={burger.price}
        veg={burger.veg}
        images={burger.images}
        />
      ))}
      {loading && <div>Loading...</div>}
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