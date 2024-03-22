import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"


export default function PublicDetail() {
    const [data, setData] = useState({})
    const params = useParams()

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=${params.language}&id=${params.id}`)

            console.log(response.data)

            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container d-flex" style={{ marginTop: '5%'}}>
                <div className="row">
                    <div className="col-md-12">
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/pub'}>Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Data</li>
                            </ol>
                        </nav>
                        <div className="media">
                            <img
                                className="mr-3"
                                alt=""
                                src="/logo.png"
                                style={{ width: '5%' }}
                            />
                            <div style={{ margin: '1%', alignItems: 'center' }} className="media-body">
                                <h5 className="mt-0">{data.title}</h5>
                                <hr />
                                <p>{data.hadeeth_ar}</p>
                                <p><i>{data.hadeeth} ({data.grade}, {data.attribution})</i></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}