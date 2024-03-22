import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../component/cardDetail";
import axios from "../utils/axios";
import showToast from "../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailPokemon } from "../features/pokemonSlice";

export default function PokedexDetail() {
    const navigate = useNavigate();
    let { id } = useParams();

    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.pokemons.detail)

    useEffect(() => {
        dispatch(fetchDetailPokemon(id))
    }, [])

    const changePageToDetail = (id) => {
        navigate(`/pokedex/${id}/edit`)
    }

    const handleOnDelete = async (id) => {
        try {
            await axios({
                url: `/pokedex/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            navigate("/pokedex")
            showToast(`Successfully deleted pokemon`);
            dispatch(fetchDetailPokemon(id));
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center content-center size-full">
                <CardDetail
                    handleOnDelete={() => handleOnDelete(myPokemon.id)}
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