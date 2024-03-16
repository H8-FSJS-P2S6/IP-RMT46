import { useNavigate } from "react-router-dom";
import map from "../assets/map.png"
import { useEffect, useState } from "react";
import showToast from "../utils/toast";
import axios from "../utils/axios";
import Cards from "./card";

export default function Hunt() {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const handleOnHunt = async (type) => {
        try {
            const response = await axios({
                url: `/hunt?type=${type}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: data,
            });
            response.data.pokemonData ? setData(response.data.pokemonData) : setData(response.data);
            showToast(response.data.message || "Yay! you got a new pokemon.");
            navigate('/hunt');
        } catch (error) {
            error.response && error.response.data ? showToast(error.response.data.message, "error") : showToast(error.message, "error")
        }
    };

    const changePageToDetail = (id) => {
        navigate(`/pokedex/${id}/edit`)
    }

    const pokemonTypes = [
        "bug", "fairy", "rock", "ice", "fighting",
        "water", "dark", "poison", "flying", "ghost",
        "dragon", "fire", "steel", "normal", "ground",
        "grass", "electric", "psychic"
    ];

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1px' }}>
                    {pokemonTypes.map((type, index) => (
                        <button key={index} className="transparent-bg text-white px-4 py-2" onClick={() => {
                            document.getElementById('my_modal_1').showModal();
                            handleOnHunt(type)
                        }}>{type}</button>
                    ))}
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center">You Got a New Pokemon!</h3>
                            <Cards
                                changePageToDetail={() => changePageToDetail(data.id)}
                                name={data.name}
                                type={data.type}
                                pokedex={data.pokedex}
                                imagePokedex={data.imagePokedex}
                            />
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">OK</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <img src={map} alt="map" className="w-full h-screen" />
            </div>
        </>
    )
}