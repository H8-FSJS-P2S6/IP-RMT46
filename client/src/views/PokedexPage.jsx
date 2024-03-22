import { useNavigate, useSearchParams } from "react-router-dom";
import Cards from "../component/card";
import axios from '../utils/axios'
import { useEffect, useState } from "react";
import Pagination from "../component/pagination";
import FilterSortAndSearch from "../component/FilterSortandSearch";
import { useDispatch, useSelector } from "react-redux"
import { setMyPokemons } from "../features/pokemonSlice";

function PokedexPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paginationOption, setPaginationOption] = useState({ currentPage: 1, total: 0, totalPage: 0 });
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const myPokemons = useSelector((state) => state.pokemons.list)

    const fetchPokemon = async (pageNumber = 1) => {
        let url = `/pokedex?page[size]=12&page[number]=${pageNumber}`;

        if (sort) {
            url += `&sort=${sort}`;
        }

        if (search) {
            url += `&search=${search}`;
        }

        if (filter) {
            url += `&filter[type]=${filter}`;
        }

        try {
            const { data } = await axios({
                url: url,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            const { currentPage, total, totalPage, data: pokemonData } = data;

            dispatch(setMyPokemons(pokemonData))

            dispatch(setPaginationOption({ currentPage, total, totalPage }));
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchPokemon(searchParams.get("page[number]") || 1);
    }, [searchParams.get("page[number]"), sort, search, filter]);

    const changePageToDetail = (id) => {
        navigate(`/pokedex/${id}/detail`)
    }

    const handleSort = (event) => {
        setSort(event.target.value);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    return (
        <>
            <div className="flex flex-col justify-between">
                <div className="flex justify-between my-5 mr-10 ml-16">
                    <h1 className="text-2xl font-bold text-center">My PokeDesu</h1>
                    <FilterSortAndSearch handleFilter={handleFilter} handleSearch={handleSearch} handleSort={handleSort} sort={sort} filter={filter} search={search} />
                </div>
                <div className="flex flex-wrap justify-center">
                    {myPokemons.map((pokemon, index) => {
                        return <Cards
                            key={index}
                            name={pokemon.name}
                            type={pokemon.type}
                            changePageToDetail={() => changePageToDetail(pokemon.id)}
                            pokedex={pokemon.pokedex}
                            imagePokedex={pokemon.imagePokedex}
                        />
                    })}
                </div>
                <div className="my-5">
                    <Pagination paginationOption={paginationOption} />
                </div>
            </div>
        </>
    )
}

export default PokedexPage;
