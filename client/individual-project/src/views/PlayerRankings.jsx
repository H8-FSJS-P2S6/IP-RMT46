import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";
import { useParams } from "react-router-dom";

function PlayerRankings() {
  const [playerRankings, setPlayerRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { country } = useParams();

  useEffect(() => {
    const fetchPlayerRankings = async () => {
      try {
        const response = await cocUrl.get(`/player-rankings/${country}`, {
          params: {
            country: country,
            limit: 10,
          },
        });
        setPlayerRankings(response.data.items);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerRankings();
  }, []);

  return (
    <div>
      <h1>Welcome to ClashInsight!</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Player Rankings</h2>
          <ul>
            {playerRankings.map((player, index) => (
              <li key={index}>
                {player.name} - {player.trophies} trophies
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlayerRankings;
