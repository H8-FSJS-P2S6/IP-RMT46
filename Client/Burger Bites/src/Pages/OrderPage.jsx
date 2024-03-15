// import { useState, useEffect } from "react"
// import NavBar from "../components/NavBar"
// import SearchBar from "../components/SearchBar"
// import SortBy from "../components/SortBy"
// import Card from "./Card"
// import { localRequest } from "../../utils/axios"

export default function Home() {
    // const [jobsData, setJobsData] = useState([])
    // const [filteredJobs, setFilteredJobs] = useState([])
    // const [searchTerm, setSearchTerm] = useState("");
    // const [sortOrder, setSortOrder] = useState("asc");
    // const [currentPage, setCurrentpage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const [filterJobType, setFilterJobType] = useState("");
    // const [companiesData, setCompaniesData] = useState([]);
    // const [filterCompanyId, setFilterCompanyId] = useState("");
    // useEffect(() => {
    //     async function getJobs() {
    //         try {
    //             const response = await localRequest.get(`https://career-portal-api.dhirenkirpalani.com/pub/jobs?filter=${filterCompanyId}&search=${searchTerm}`);
    //             setJobsData(response.data.data)
    //             setFilteredJobs(response.data.data)
    //             setTotalPages(response.data.totalPage)
    //             console.log(response);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     getJobs()
    // }, [filterCompanyId, searchTerm]);

    // useEffect(() => {
    //     async function getCompanies() {
    //         try {
    //             const response = await localRequest.get('https://career-portal-api.dhirenkirpalani.com/pub/companies');
    //             setCompaniesData(response.data)
    //             console.log(response);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     getCompanies()
    // }, []);


    // const handleSearch = (term) => {
    //     setSearchTerm(term);
    // }

    // const handleSort = (order) => {
    //     setSortOrder(order);
    //     const sortedJobs = [...filteredJobs].sort((a, b) => {
    //         if (order === "asc") {
    //             return new Date(a.createdAt) - new Date(b.createdAt);
    //         } else {
    //             return new Date(b.createdAt) - new Date(a.createdAt);
    //         }
    //     });
    //     setFilteredJobs(sortedJobs);
    // };

    // const handlePageChange = (pageNumber) => {
    //     setCurrentpage(pageNumber);
    //     window.scrollTo(0, 0)
    // }

    // const handleFilterJobType = (jobType) => {
    //     setFilterJobType(jobType);
    //     if (jobType === "") {
    //         setFilteredJobs(jobsData);
    //     } else {
    //         const filtered = jobsData.filter((job) => job.jobType === jobType);
    //         setFilteredJobs(filtered);
    //     }
    // }

    // const handleFilterCompany = (companyId) => {
    //     setFilterCompanyId(companyId);
    // };

    // const startIndex = (currentPage - 1) * 10
    // const endIndex = startIndex + 10

    // console.log({ companiesData });

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
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#order">Order</a>
          </li>
          <li>
            <a href="#reviews">Reviews</a>
          </li>
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
      <button className="cart-button" style={{fontSize: "20px"}}>
      <i className="fas fa-shopping-cart cart-icon"></i>
    </button>
    </nav>
  </div>
  {/* Navbar End */}
  {/* Home Section Start */}
  
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
    <div className="card-content" data-aos="fade-up" data-aos-duration={1500}>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
    </div>
    <div className="card-content" data-aos="fade-up" data-aos-duration={1500}>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="card-body">
          <div className="img">
            <img src="https://www.kitchensanctuary.com/wp-content/uploads/2019/08/Crispy-Chicken-Burger-square-FS-4518.jpg" alt="" />
          </div>
          <h3>
            Burger <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eligendi?
          </p>
          <h5>
            $65 <button>Add to Cart</button>
          </h5>
        </div>
      </div>
    </div>
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
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
      </script>
</>

    )
}