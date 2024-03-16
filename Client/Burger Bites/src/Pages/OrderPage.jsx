import { useState, useEffect } from "react"
import { localRequest } from "../utils/axios"
import Card from "./Card";

export default function Home() {
    const [burgerData, setBurgerData] = useState([])
    const [loading, setLoading] = useState(false);
    // const [filteredJobs, setFilteredJobs] = useState([])
    // const [searchTerm, setSearchTerm] = useState("");
    // const [sortOrder, setSortOrder] = useState("asc");
    // const [currentPage, setCurrentpage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const [filterJobType, setFilterJobType] = useState("");
    // const [companiesData, setCompaniesData] = useState([]);
    // const [filterCompanyId, setFilterCompanyId] = useState("");
    useEffect(() => {
        async function getBurgers() {
          setLoading(true);
            try {
                const response = await localRequest.get(`/burgers`);
                setBurgerData(prevData => [...prevData, ...response.data]);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        getBurgers()

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
        getBurgers();
      }
  };

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
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
      </script>
</>

    )
}