export default function FilterSortAndSearch({ sort, search, filter, handleSort, handleSearch, handleFilter }) {
    const pokemonTypes = [
        "water", "bug", "dark", "dragon", "electric",
        "fairy", "fighting", "fire", "flying", "ghost",
        "grass", "ground", "ice", "normal", "poison",
        "psychic", "rock", "steel"
    ];

    return (
        <>
            <div className="navbar-end join flex justify-end mr-5">
                <div>
                    <div>
                        <input
                            onChange={handleSearch}
                            value={search}
                            type="text"
                            className="input input-bordered join-item"
                            placeholder="Search" />
                    </div>
                </div>
                <select value={filter} onChange={handleFilter} className="select select-bordered join-item">
                    <option disabled value={""}>
                        Filter
                    </option>
                    {pokemonTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <select value={sort} onChange={handleSort} className="select select-bordered join-item">
                    <option disabled value={""}>
                        Sort
                    </option>
                    <option value={"-createdAt"}>latest</option>
                    <option value={"createdAt"}>oldest</option>
                </select>
            </div>
        </>
    )
}