import React, { useState, useEffect } from "react";
import axios from "axios";
import cocUrl from "../utils/axios";

function PlayerRankings() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await cocUrl.get("/get-country");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchPlayerRankings = async () => {
      try {
        setLoading(true);
        const response = await cocUrl.get("/player-rankings", { country: selectedCountry });
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player rankings:", error);
        setLoading(false);
      }
    };

    fetchPlayerRankings();
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <h2>Player Rankings</h2>
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
          <h3>Player Rankings for {selectedCountry}</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {players.items.map((player, index) => (
                <tr key={index}>
                  <td>{player.rank}</td>
                  <td>{player.name}</td>
                  <td>{player.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PlayerRankings;
