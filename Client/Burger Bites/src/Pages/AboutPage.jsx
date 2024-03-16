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
  {/* About Section Start */}
  <section
    className="about"
    id="about"
    data-aos="fade-up"
    data-aos-duration={1500}
  >
    <div className="about-img">
      <img src="./images/about-img.png" alt="" />
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
      <button className="about-btn">Read More...</button>
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