import { createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axios';

const initialState = {
    list: [],
    detail: [],
    pagination: { currentPage: 1, total: 0, totalPage: 0 },
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setMyPokemons: (state, action) => {
            state.list = action.payload;
        },
        setPaginationOption: (state, action) => {
            state.pagination = action.payload;
        },
        setMyPokemon: (state, action) => {
            state.detail = action.payload;
        },
    },
});

export const { setMyPokemons, setPaginationOption, setMyPokemon } = pokemonSlice.actions;

export const fetchAllPokemon = (pageNumber) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                url: `/pokedex?page[size]=12&page[number]=${pageNumber}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const { currentPage, total, totalPage, data: pokemonData } = data;

            dispatch(setMyPokemons(pokemonData));
            dispatch(setPaginationOption({ currentPage, total, totalPage }));
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

export const fetchDetailPokemon = (id) => {
    return async (dispatch) => {
        try {
            let { data } = await axios({
                url: `/pokedex/${id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(setMyPokemon(data))
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const fetchDeletePokemon = (pokemonId, navigate, showToast, id) => {
    return async (dispatch) => {
        try {
            await axios({
                url: `/pokedex/${pokemonId}`,
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
}

export const fetchUpdatePokemon = ( myPokemon) => {
    return async () => {
        try {
            await axios({
                url: `/pokedex/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: myPokemon,
            });
        } catch (error) {
            showToast(error.response?.data?.message || error.message, "error");
        }
    }
};

export default pokemonSlice.reducer;
