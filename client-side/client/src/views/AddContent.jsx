import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";


export default function AddContent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [CategoryId, setCategoryId] = useState(''); // Perbaikan nama state dan inisialisasi

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('https://project.mf-cyberse.online/categories', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log(response.data);
            setCategory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://project.mf-cyberse.online/contents', {
                title, description, CategoryId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log(response);
            navigate('/contents');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5" style={{textAlign: 'center'}}>
                <h2>Add New Content Form</h2>
            </div>
            <div className="container mt-5" style={{width: '50%'}}>
                <div className="row">
                    <div className="col-md-12">
                        <form role="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputTitle1">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputTitle1"
                                    name="title"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div><br />

                            <div className="form-group">
                                <label htmlFor="exampleInputDescription1">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="description"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div><br />

                            <div className="form-group">
                                <label htmlFor="selectCategory">Category: </label> <br />
                                <select
                                    name="CategoryId"
                                    value={CategoryId} // Perbaikan nilai yang dipilih
                                    onChange={(e) => {
                                        setCategoryId(e.target.value); // Pindahkan event onChange ke select
                                    }}
                                >
                                    <option defaultValue disabled>--Select Category--</option>
                                    {category.map(each => (
                                        <option key={each.id} value={each.id}>{each.name}</option> // Perbaikan properti value
                                    ))}
                                </select>
                            </div><br />

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
