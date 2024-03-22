import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Public() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://project.mf-cyberse.online/pub')

            console.log(response.data.data)

            setData(response.data.data)
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
            <div className="container" style={{textAlign: 'center', margin: '2%'}}>
                <h2>List Title of Hadith</h2>
            </div>
            <div className="container">
                {data.map(each => (
                    <div key={each.id} className="col" style={{padding: '2%', marginBottom: '2%', marginLeft: '4%', marginRight: '4%' }}>
                        <div className="card " style={{padding: '2%'}}>
                            <div className="card-body">

                                <div className="col-md-6">
                                    <p className="card-text">Title: <strong> {each.title} </strong> </p>
                                </div>
                                <div className="col-md-6">
                                    Choose Translation: <br />
                                    {each.translations.map((e, index) => (
                                        <Link key={index} to={`/pub/${each.id}/${e}`}>
                                            <button className="btn btn-outline-info m-1">{e}</button>
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}