import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../component/cardDetail";
import axios from "../utils/axios";

export default function PokedexDetail() {
    const navigate = useNavigate();
    const [myPokemon, setMyPokemon] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                let { data } = await axios({
                    url: `/pokedex/${id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                setMyPokemon(data)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchPokemon();
    }, [])

    const changePageToDetail = (id) => {
        navigate(`/pokedex/${id}/edit`)
    }

    return (
        <>
            <div className="flex flex-col justify-center content-center size-full">
                <CardDetail
                    changePageToDetail={() => changePageToDetail(myPokemon.id)}
                    name={myPokemon.name}
                    pokedex={myPokemon.pokedex}
                    imagePokedex={myPokemon.imagePokedex}
                    type={myPokemon.type}
                    attack={myPokemon.attack}
                    hp={myPokemon.hp}
                    height={myPokemon.height}
                    weight={myPokemon.weight}
                    imageFront={myPokemon.imageBattleFront}
                    imageBack={myPokemon.imageBattleBack}
                />
            </div>
        </>
    )
}