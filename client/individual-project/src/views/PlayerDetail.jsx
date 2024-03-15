import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerDetail() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playerTag } = useParams();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        console.log(playerTag, "tagar");
        const response = await cocUrl.get(`/find-player/${playerTag}`);
        setPlayer(response.data);
        setLoading(false);
        console.log(response.data, "data");
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerDetails();
  }, [playerTag]);

  return (
    <div>
      <h1>Player Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : player ? (
        <div>
          <p>Name: {player.name}</p>
          <p>Tag: {player.tag}</p>
          <p>Level: {player.expLevel}</p>
        </div>
      ) : (
        <p>Player not found</p>
      )}
    </div>
  );
}

export default PlayerDetail;
