export default function TopUp({ handleRadioChange, coinsToPurchase }) {

    return (
        <>

            <div className="bg-white dark:bg-gray-900">
                <form>
                    <div className="container px-6 py-8 mx-auto">
                        <p className="text-xl text-center text-gray-500 dark:text-gray-300">
                            Payment
                        </p>
                        <h1 className="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
                            Pilih jumlah Coin
                        </h1>
                        <div className="mt-6 space-y-8 xl:mt-12">
                            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="coinsToPurchase"
                                        value="10"
                                        onChange={handleRadioChange}
                                    />
                                    <div className="mx-5 space-y-1">
                                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                                            10 Coins
                                        </h2>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-500 sm:text-4xl dark:text-gray-300">
                                    Rp. 100.000,-
                                </h2>
                            </div>
                            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="coinsToPurchase"
                                        value="100"
                                        onChange={handleRadioChange}
                                    />
                                    <div className="mx-5 space-y-1">
                                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                                            100 Coins
                                        </h2>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-500 sm:text-4xl dark:text-gray-300">
                                    Rp. 1.000.000,-
                                </h2>
                            </div>
                            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl dark:border-gray-700">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="coinsToPurchase"
                                        value="1000"
                                        onChange={handleRadioChange}
                                    />
                                    <div className="mx-5 space-y-1">
                                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                                            1000 Coins
                                        </h2>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-500 sm:text-4xl dark:text-gray-300">
                                    Rp. 10.000.000,-
                                </h2>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={coinsToPurchase} id="pay-button" type="submit" className="px-8 py-2 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}