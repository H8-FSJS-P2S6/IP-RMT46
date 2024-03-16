import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Done() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6 mt-20">Thank you for your purchase!</h1>
            <Button 
                name={"Go to Home"} 
                buttonClass="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                buttonType={"submit"} 
                onClick={() => navigate("/products/product")}
            />
        </div>
    );
}
