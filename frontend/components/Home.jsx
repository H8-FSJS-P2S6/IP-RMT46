import React, { useState, useEffect } from "react";
import baseUrl from "../utils/baseUrl";

function Home() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentUV, setCurrentUV] = useState({});
  const [location, setLocation] = useState("");

  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [artikel, setArtikel] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    try {
      const responseLocation = await baseUrl.get(
        `/weathers/location-detail/${search}`
      );
      if (responseLocation.status === 200) {
        setLocation(responseLocation.data);
      }

      const responseWeather = await baseUrl.get(`/weathers/current/${search}`);
      if (responseWeather.status === 200) {
        setCurrentWeather(responseWeather.data);
      }

      const responseUV = await baseUrl.get(`/uv/current/${search}`);
      if (responseUV.status === 200) {
        setCurrentUV(responseUV.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataArtikel = async () => {
    try {
      const responseArtikel = await baseUrl.get(`/artikel`);
      if (responseArtikel.status === 200) {
        const artikel = responseArtikel.data;
        await Promise.all(
          artikel.map(async (perArtikel) => {
            const responseCategory = await baseUrl.get(
              `/categories/${perArtikel.CategoryId}`
            );
            if (responseCategory.status === 200) {
              perArtikel.categoryName = responseCategory.data.name;
            }
            const responseUser = await baseUrl.get(
              `/auth/user/${perArtikel.UserId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (responseUser.status === 200) {
              perArtikel.userEmail = responseUser.data.email;
            }
          })
        );
        setArtikel(artikel);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(artikel)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(city);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (search.trim()) {
      fetchData();
    }
    fetchDataArtikel();
  }, [search]);

  // console.log(currentWeather)

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="/dashboard"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  {!isLoggedIn && (
                    <>
                      <a
                        href="/login"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Register
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="flex">
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
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {location && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-lg font-semibold">
              {location.name}, {location.admin1}, {location.country}
            </div>
            <div>Timezone: {location.timezone}</div>
            <div>Latitude: {location.latitude}</div>
            <div>Longitude: {location.longitude}</div>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4">
        {currentWeather && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-lg font-semibold">Current Weather</div>
            <div>Time: {currentWeather.current?.time}</div>
            <div>Temperature: {currentWeather.current?.temperature_2m} °C</div>
            <div>
              Feels Like: {currentWeather.current?.apparent_temperature} °C
            </div>
            <div>Humidity: {currentWeather.current?.relative_humidity_2m}%</div>
            <div>Precipitation: {currentWeather.current?.precipitation} mm</div>
            <div>Rain: {currentWeather.current?.rain} mm</div>
            <div>Cloud Cover: {currentWeather.current?.cloud_cover}%</div>
            <div>Wind Speed: {currentWeather.current?.wind_speed_10m} km/h</div>
            <div>
              Wind Direction: {currentWeather.current?.wind_direction_10m}°
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4">
        {currentUV && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-lg font-semibold">Current UV Index</div>
            <div>UV Index: {currentUV.uv?.toFixed(2) ?? "N/A"}</div>
            <div>
              UV Index Time:{" "}
              {currentUV.uv_time
                ? new Date(currentUV.uv_time).toLocaleString()
                : "N/A"}
            </div>
            <div>
              Maximum UV Index Today: {currentUV.uv_max?.toFixed(2) ?? "N/A"}
            </div>
            <div>
              Maximum UV Index Time:{" "}
              {currentUV.uv_max_time
                ? new Date(currentUV.uv_max_time).toLocaleString()
                : "N/A"}
            </div>
            <div>Ozone: {currentUV.ozone ?? "N/A"} DU</div>
            <div>
              Ozone Measurement Time:{" "}
              {currentUV.ozone_time
                ? new Date(currentUV.ozone_time).toLocaleString()
                : "N/A"}
            </div>
            <div className="pt-4 font-semibold">Sun Information</div>
            <div>
              Solar Noon:{" "}
              {currentUV.sun_info?.sun_times?.solarNoon
                ? new Date(
                    currentUV.sun_info.sun_times.solarNoon
                  ).toLocaleString()
                : "N/A"}
            </div>
            <div>
              Sunrise:{" "}
              {currentUV.sun_info?.sun_times?.sunrise
                ? new Date(
                    currentUV.sun_info.sun_times.sunrise
                  ).toLocaleString()
                : "N/A"}
            </div>
            <div>
              Sunset:{" "}
              {currentUV.sun_info?.sun_times?.sunset
                ? new Date(currentUV.sun_info.sun_times.sunset).toLocaleString()
                : "N/A"}
            </div>
            <div className="pt-2">
              Sun Position - Azimuth:{" "}
              {currentUV.sun_info?.sun_position?.azimuth?.toFixed(4) ?? "N/A"}{" "}
              radians
            </div>
            <div>
              Sun Position - Altitude:{" "}
              {currentUV.sun_info?.sun_position?.altitude?.toFixed(4) ?? "N/A"}{" "}
              radians
            </div>
          </div>
        )}
      </div>

      <div className="container mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artikel.map((perArtikel) => (
            <div
              className="col-span-1 sm:col-span-2 md:col-span-1 mb-3"
              key={perArtikel.id}
            >
              <div className="bg-white shadow-md rounded-lg p-4">
                {/* <img src={perArtikel.logo} className="w-full" alt={perArtikel.title} /> */}
                <div className="p-4">
                  <h2 className="font-bold text-xl leading-loose">
                    {perArtikel.title}
                  </h2>
                  <h5 className="leading-loose">{`Author: ${perArtikel.userEmail}`}</h5>
                  <h5 className="leading-loose">{`Category: ${perArtikel.categoryName}`}</h5>
                  <p className="text-gray-600">{perArtikel.description}</p>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Detail
                  </button>
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
