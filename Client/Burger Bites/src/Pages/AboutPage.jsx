import logo from "../assets/Logo.png"

export default function Home() {

    return (
        <>
  {/* About Section Start */}
  <section
    className="about"
    id="about"
    data-aos="fade-up"
    data-aos-duration={1500}
  >
    <div className="about-img">
      <img src={logo} alt="" />
    </div>
    <div className="about-info">
      <h6>About us</h6>
      <h3>Burger Bites</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sed
        repellat, cum, enim doloribus fugit incidunt aut sunt, autem doloremque
        quae laboriosam velit maiores? Voluptatum incidunt animi illo!
        Reprehenderit quis minus adipisci accusantium atque omnis assumenda
        aperiam architecto, nulla qui ad doloribus harum doloremque ducimus
        iusto alias exercitationem corporis mollitia!
      </p>
    </div>
  </section>
  {/* About Section End */}
  {/* Footer Start */}
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