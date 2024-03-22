import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import Navbar from "./Navbar"

export default function EditPage() {
    const params = useParams()
    const [content, setContent] = useState({ title: "", description: "", CategoryId: "" })
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://project.mf-cyberse.online/contents/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // console.log(response.data)
            setContent(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`https://project.mf-cyberse.online/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // console.log(response.data)
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchCategories()
    }, [])

    const handleChange = (e) => {
        setContent({
            ...content,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`https://project.mf-cyberse.online/contents/${params.id}`, content, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            navigate('/contents')
        } catch (error) {
            console.log(error)
            alert("Failed to update content")
        }
    }

    return (
        <>
            <Navbar />
            <div className="container justify-content-center" style={{ padding: '5%', alignSelf: 'center' }}>
                <div className="col">
                    <form onSubmit={handleSubmit} className="form" style={{ padding: '5%', alignContent: 'center' }}>
                        <h2>Edit your content</h2>
                        <div class="mb-3">
                            <label class="form-label">Title</label><br />
                            <input type="text" name="title" value={content.title} onChange={handleChange} />
                        </div>

                        <div >
                            <label class="form-label">Description</label><br />
                            <textarea
                                rows="4"
                                cols="50"
                                name="description"
                                value={content.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label><br />
                            <select name="CategoryId" value={content.CategoryId} onChange={handleChange}>
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Update Content</button>
                    </form>
                </div>
            </div>
        </>
    )
}
