// import { useState, useEffect } from "react"
// import NavBar from "./NavBar"
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
      <img src="./images/bg-img" alt="" />
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
      <div className="row">
        <img src="./images/i2.png" alt="" />
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
        <img src="./images/i3.png" alt="" />
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