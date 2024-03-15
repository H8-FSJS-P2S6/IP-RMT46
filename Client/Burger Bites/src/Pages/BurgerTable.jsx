// import { useState, useEffect } from "react"
// import { localRequest } from "../../utils/axios"
// import { Link, useNavigate, Outlet } from "react-router-dom"

export default function JobsTable() {
    function formatCreatedAt(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }
    // const [jobsData, setJobsData] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("")

    // const navigate = useNavigate()

    // const fetchJobs = async () => {
    //     setLoading("Loading...")
    //     setError("")
    //     try {
    //         let { data } = await localRequest({
    //             url: "/jobs",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         setJobsData(data)
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error.response?.data.message || error.message)
    //         setError(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const deleteJob = async (jobId) => {
    //     try {
    //         let { data } = await localRequest({
    //             url: `/jobs/${jobId}`,
    //             method: "delete",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         setJobsData(jobsData.filter((job) => job.id !== jobId))
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error.response?.data.message || error.message)
    //         setError(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchJobs()
    // }, []);

    // if (error) {
    //     return <h3>{error.message ?? error}</h3>
    // }

    // if (loading) {
    //     return <h3>Loading...</h3>
    // }

    return (
        <>
            {/* <Outlet /> */}
            <section
                className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                id="job-section"
            >
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="display-2">Jobs</h1>
                    {/* <Link to="/cms/add"> */}
                        <button className="btn btn-primary rounded-pill" id="new-job">
                            <span className="icon material-symbols-outlined">add</span>New Job
                        </button>
                    {/* </Link> */}
                </div>
                <div className="row">
                    <div className="col-12 table-responsive">
                        <table className="table align-middle table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" width="180px">
                                        Description
                                    </th>
                                    <th scope="col" width="250px">
                                        Price
                                    </th>
                                    <th scope="col">Veg</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Updated At</th>
                                    <th scope="col" width="50px">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="table-job">
                                {jobsData.map((job, index) => (
                                    <tr key={job.id}>
                                        <td scope="row">{index + 1}</td>
                                        <td className="fw-bold">{job.title}</td>
                                        <td>
                                            {job.description}
                                        </td>
                                        <td>
                                            <img
                                                src={job.imgUrl}
                                                className="img-fluid"
                                            />
                                        </td>
                                        <td>{job.jobType}</td>
                                        <td className="fw-bold">{job.CompanyId}</td>
                                        <td className="fw-bold">{job.AuthorId}</td>
                                        <td className="fw-bold">{formatCreatedAt(job.createdAt)}</td>
                                        <td className="fw-bold">{formatCreatedAt(job.updatedAt)}</td>
                                        <td>
                                            <span className="d-flex">
                                                <a href="" className="ms-3" onClick={() => deleteJob(job.id)}>
                                                    <span className="icon material-symbols-outlined text-danger">
                                                        delete
                                                    </span>
                                                </a>
                                                {/* <Link to={`/cms/update/${job.id}`}> */}
                                                    <a href="" className="ms-3">
                                                        <span className="icon material-symbols-outlined text-primary">
                                                            edit
                                                        </span>
                                                    </a>
                                                {/* </Link> */}
                                                {/* <Link to={`/cms/updateImgUrl/${job.id}`}> */}
                                                    <a href="" className="ms-3">
                                                        <span className="icon material-symbols-outlined text-success">
                                                            image
                                                        </span>
                                                    </a>
                                                {/* </Link> */}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}