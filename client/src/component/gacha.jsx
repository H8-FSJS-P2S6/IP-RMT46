import showToast from "../utils/toast";
import Cards from "./card";
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios";
import { useEffect, useState } from "react";

export default function Gacha({ quantity }) {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const handleOnGacha = async () => {
        try {
            const response = await axios({
                url: `/shop?quantity=${quantity}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: data,
            });
            setData(response.data);
            navigate('/shop');
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    };

    const changePageToDetail = (id) => {
        navigate(`/pokedex/${id}/edit`)
    }

    return (
        <>
            <button className="flex-grow btn btn-square btn-accent" onClick={() => {
                document.getElementById('my_modal_1').showModal();
                handleOnGacha();
            }}>{quantity}X</button >
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">You Got a New Pokemon!</h3>
                    {data.map((gacha, index) => {
                        return <Cards
                            key={index}
                            changePageToDetail={() => changePageToDetail(gacha.id)}
                            name={gacha.name}
                            type={gacha.type}
                            pokedex={gacha.pokedex}
                            imagePokedex={gacha.imagePokedex}
                        />
                    })}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">OK</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}