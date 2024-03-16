import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleOnUpload = async () => {
        if(file){
            try {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("name", "pokee");
                
                await axios.post(`https://medshop.carloshakim.online/proof`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                
                navigate('/products/done');
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChangeInput = (event) => {
        if(event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }
    return (
        <div className="container mx-auto my-10">
            <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Upload Proof of Purchase</h2>
                <div className="mb-4">
                    <input
                        onChange={handleChangeInput}
                        type="file"
                        className="border border-gray-300 p-2 w-full"
                        id="inputGroupFile02"
                    />
                </div>
                <button
                    onClick={handleOnUpload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Upload
                </button>
            </div>
        </div>
    );
}
