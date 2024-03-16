import React, { useState, useEffect } from "react";
import axios from "axios";
import cocUrl from "../utils/axios";

function ClanRankings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [clans, setClans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await cocUrl.get("/get-country");
        console.log(response.data, "country");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchClanRankings = async () => {
      try {
        setLoading(true);
        const response = await cocUrl.get("/clan-rankings", { country: selectedCountry });
        console.log(response.data, "clan");
        setClans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clan rankings:", error);
        setLoading(false);
      }
    };

    fetchClanRankings();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <h2>Clan Rankings</h2>
      <div>
        <label htmlFor="countrySelect">Select Country:</label>
        <select id="countrySelect" value={selectedCountry} onChange={handleCountryChange}>
          <option value="global">Global</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>Clan Rankings for {selectedCountry}</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {clans.items.map((clan, index) => (
                <tr key={index}>
                  <td>{clan.rank}</td>
                  <td>{clan.name}</td>
                  <td>{clan.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ClanRankings;
