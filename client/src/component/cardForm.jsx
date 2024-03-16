export default function CardForm({ imagePokedex, pokedex, type, name, handleOnUpdate, attack, hp, height, weight, imageFront, imageBack, handleChangeInput }) {

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="w-1/2 m-2 relative overflow-hidden bg-gray-500 rounded-lg max-w-xs shadow-lg">
                    <form className="w-full">
                        <img
                            className="w-full"
                            src={imagePokedex}
                            alt="imagePokedex"
                        />
                        <div className="relative text-white px-6 pb-6 mt-6">
                            <span className="block opacity-75 mb-1">Type: {type}</span>
                            <div className="flex justify-between">
                                <input
                                    className="block font-semibold text-xl bg-gray-500 border border-orange-500 size-8/12"
                                    name='name'
                                    value={name}
                                    onChange={handleChangeInput}
                                    type="text" />
                                <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                                    #{pokedex}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="mt-2">Attack: {attack}</span>
                                <span className="mt-2 mr-2">HP: {hp}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="mb-2">Height: {height}</span>
                                <span className="mb-2 mr-2">Weight: {weight}</span>
                            </div>
                            <div className="">
                                <label className="font-bold flex justify-center" htmlFor="animation">Animation Battle</label>
                                <div className="flex justify-between mx-5">
                                    <img src={imageFront} alt="front" />
                                    <img src={imageBack} alt="back" />
                                </div>
                            </div>
                            <div className="flex justify-center mt-2">
                                <button type="submit" onClick={handleOnUpdate} className="btn bg-white rounded-full text-orange-400 text-xs font-bold leading-none">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}