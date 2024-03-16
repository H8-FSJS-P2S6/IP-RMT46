import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
export default function UserProductDetail() {
    const [dataProduct, setDataProduct] = useState([]);
    let {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let pubData = await axios.get(`https://medshop.carloshakim.online/products/${id}`,{headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }})
                console.log(pubData);
                setDataProduct(pubData.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    console.log(id);

    return (
        <div className="container">
            <Button
            name={"Back"}
            buttonClass={"bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"}
            buttonType={"submit"}
            onClick={() => navigate("/products")}>
                Back
            </Button>

        <div className="container d-flex justify-content-center">
        <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center">
                <img src={dataProduct.imageUrl} className="w-2/3 h-auto" alt="Product" />
                <div className="p-1">
                    <h1 className="text-lg font-semibold mb-5 text-center">{dataProduct.name}</h1>
                    <p className="text-gray-900 font-bold mb-4 text-center">Price: {dataProduct.price}</p>
                    <p className="text-gray-800 mb-4 text-center">Description: {dataProduct.description}</p>
                    <p className="text-gray-800 mb-2 text-center">Usage: {dataProduct.usage}</p>
                </div>
            </div>
            <div className="bg-gray-100 p-4">
                <small className="text-gray-500">Last updated {dataProduct.updatedAt}</small>
            </div>
        </div>
        </div>
        </div>
    );
    
    
    
}
