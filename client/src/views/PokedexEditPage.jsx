import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import showToast from "../utils/toast";
import CardForm from "../component/cardForm";
import { useDispatch } from "react-redux";
import { fetchUpdatePokemon } from "../features/pokemonSlice";

export default function PokedexEdit() {
    const navigate = useNavigate();
    const [myPokemon, setMyPokemon] = useState([]);
    let { id } = useParams();

    const dispatch = useDispatch();

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

    useEffect(() => {
        fetchPokemon();
    }, [])

    const handleChangeInput = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setMyPokemon({
            ...myPokemon,
            [key]: value,
        })

    }

    const handleOnUpdate = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdatePokemon(myPokemon))
        navigate('/pokedex')
    };

    return (
        <>
            <div className="flex flex-col justify-center content-center size-full">
                <div className="text-center text-xl font-bold">change a nickname</div>
                <div className="text-center text-xl font-bold">Enter in the orange box</div>
                <CardForm
                    handleOnUpdate={handleOnUpdate}
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
                    handleChangeInput={handleChangeInput}
                />
            </div>
        </>
    )
}