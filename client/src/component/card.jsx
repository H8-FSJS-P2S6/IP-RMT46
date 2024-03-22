export default function Cards({ imagePokedex, pokedex, type, name, changePageToDetail }) {

    return (
        <>
            <div className="flex flex-wrap items-center justify-center">
                <div className="flex-shrink-0 m-2 relative overflow-hidden bg-gray-500 rounded-lg max-w-xs shadow-lg">
                    <div className="relative pt-10 px-10 flex items-center justify-center">
                        <div
                            className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                            style={{
                                background: "radial-gradient(black, transparent 60%)",
                                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                                opacity: "0.2"
                            }}
                        />
                        <img
                            className="relative w-40"
                            src={imagePokedex}
                            alt="imagePokedex"
                        />
                    </div>
                    <div className="relative text-white px-6 pb-6 mt-6">
                        <span className="block opacity-75 -mb-1">Type: {type}</span>
                        <div className="flex justify-between">
                            <span className="block font-semibold text-xl">{name}</span>
                            <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                                #{pokedex}
                            </span>
                        </div>
                        <span className="flex flex-grow justify-center mt-2">
                            <button onClick={changePageToDetail} className="btn btn-circle block bg-white rounded-full text-orange-400 text-xs font-bold leading-none">Detail</button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}