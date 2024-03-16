import Gacha from "../component/gacha";

function ShopPage() {
    return (
        <>
            <div className="flex flex-col size-full">
                <div className="flex flex-wrap justify-center mt-20">
                    <div className="flex flex-row flex-wrap flex-shrink-0 w-full m-2 relative overflow-hidden bg-gray-500 rounded-lg max-w-xs shadow-lg">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Math.floor(Math.random() * 300) + 1}.gif`} alt="pokedesu" />
                    </div>
                </div>
                <div className="flex justify-center mt-10 size-full">
                    <div className="mx-20">
                        <Gacha quantity={1} />
                    </div>
                    <div className="mx-20">
                        <Gacha quantity={10} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopPage;
