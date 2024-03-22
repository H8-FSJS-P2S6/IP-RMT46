import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import LogoutButton from "./LogoutButton"
import { Link, useParams } from "react-router-dom"
import AddContent from "../views/AddContent"
import AddContentButton from "./AddContentButton"


export default function ContentPage() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState({})
    const params = useParams()

    const fetchData = async () => {
        try {
            const response = await axios.get('https://project.mf-cyberse.online/contents', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

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
            <LogoutButton />
            <AddContentButton />
            <div className="container" style={{ textAlign: 'center' }}>
                <h3>Contents of Islamic Education</h3>
            </div>
            <div className="container justify-content-center" style={{ padding: '5%', alignSelf: 'center' }}>
                <div className="col">
                    {data.map(each => (

                        <div key={each.id} className="card m-3" style={{ width: '50%', padding: '3%' }}>
                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <h4>{each.title}</h4>
                            <div className="card-body">
                                <p className="card-text">
                                    {each.description}
                                </p>
                                <i>Label Category: </i> <strong> {each.Category.name} </strong> <br />
                                <i>Created by:</i> <u>{each.User.username}</u>
                            </div>
                            <Link to={`/edit/${each.id}`} className="btn btn-outline-warning">
                                Edit content
                            </Link>
                            <button onClick={async (e) => {
                                e.preventDefault()
                                try {
                                    await axios.delete(`https://project.mf-cyberse.online/contents/${each.id}`, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                        }
                                    })

                                    setData(data.filter(item => item.id !== id))
                                } catch (error) {
                                    console.log(error)
                                }
                            }} className="btn btn-outline-danger">
                                Delete
                            </button>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}