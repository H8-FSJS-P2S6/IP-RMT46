import React, { useState, useEffect } from 'react';
import baseUrl from '../utils/baseUrl';

function Home() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [artikel, setArtikel] = useState([]);

  const fetchData = async () => {
    try {
      const response = await baseUrl.get(`/weathers/current/${search}`);
      if (response.status === 200) {
        setCurrentWeather(response.data);
      }

      const responseArtikel = await baseURL.get(`/artikel`);
      if (responseArtikel.status === 200) {
        const artikel = responseArtikel.data;
        await Promise.all(artikel.map(async (perArtikel) => {
          const responseCategory = await baseURL.get(`/categories/${perArtikel.CategoryId}`);
          if (responseCategory.status === 200) {
            perArtikel.categoryName = responseCategory.data.name;
          }
          const responseUser = await baseURL.get(`/auth/user/${perArtikel.UserId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (responseUser.status === 200) {
            perArtikel.userEmail = responseUser.data.email;
          }
        }));  
        setArtikel(artikel);
      }

    } catch (error) {
      console.error(error);
    }
  };

  console.log(artikel)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(city);
  };

  useEffect(() => {
    if (search.trim()) {
      fetchData();
    }
  }, [search]);

  return (
    <>
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="text-gray-900 border-2 border-gray-300 rounded-md py-2 px-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Search
        </button>
      </form>

      {currentWeather && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-lg font-semibold">{search}</div>
          <div>{currentWeather.LocalObservationDateTime}</div>
          <div>{currentWeather.WeatherText}</div>
          <div>
            Temperature: {currentWeather.Temperature?.Metric?.Value} °{currentWeather.Temperature?.Metric?.Unit}
          </div>
        </div>
      )}
    </div>

    <div className="container mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artikel.map(perArtikel => (
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mb-3" key={perArtikel.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              {/* <img src={perArtikel.logo} className="w-full" alt={perArtikel.title} /> */}
              <div className="p-4">
                <h2 className="font-bold text-xl leading-loose">{perArtikel.title}</h2>
                <h5 className="leading-loose">{`Author: ${perArtikel.userEmail}`}</h5>
                <h5 className="leading-loose">{`Category: ${perArtikel.categoryName}`}</h5>
                <p className="text-gray-600">{perArtikel.description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => window.location.href=`/dashboard/update-artikel/${perArtikel.id}`}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleDelete(perArtikel.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;