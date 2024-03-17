// import { useState, useEffect } from "react"
// import NavBar from "../components/NavBar"
// import SearchBar from "../components/SearchBar"
// import SortBy from "../components/SortBy"
// import Card from "./Card"
// import { localRequest } from "../../utils/axios"
import Avatar1 from "../assets/Avatar Image.png"
import Avatar2 from "../assets/Avatar Image (1).png"
import Avatar3 from "../assets/Avatar Image (2).png"

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
  {/* Reviews Start */}
  <section
    className="reviews"
    id="reviews"
    data-aos="fade-up"
    data-aos-duration={1500}
  >
    <h3>
      What Our <span>Customers</span> Say
    </h3>
    <div className="review-card">
      <div className="row">
        <div className="rating">
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
          repudiandae dolorum ab beatae perferendis asperiores rem corrupti
          blanditiis commodi et?
        </p>
        <h6>
          <img src={Avatar1} alt="" />
          Elon Musk
        </h6>
      </div>
      <div className="row">
        <div className="rating">
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
          repudiandae dolorum ab beatae perferendis asperiores rem corrupti
          blanditiis commodi et?
        </p>
        <h6>
          <img src={Avatar2} alt="" />
          Elon Musk
        </h6>
      </div>
      <div className="row">
        <div className="rating">
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
          <i className="fa-solid fa-star checked" />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
          repudiandae dolorum ab beatae perferendis asperiores rem corrupti
          blanditiis commodi et?
        </p>
        <h6>
          <img src={Avatar3} alt="" />
          Elon Musk
        </h6>
      </div>
    </div>
  </section>
  {/* Reviews End */}
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