import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerDetail() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playerTag } = useParams();

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await cocUrl.get(`/find-player/${playerTag}`);
        setPlayer(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlayerDetails();
  }, [playerTag]);

  const handleClaimAccount = () => {
    console.log("Claim Account button clicked!");
  };

  return (
    <div className="container">
      <h1 className="my-4">Player Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : player ? (
        <div>
          <img src={`/get-image?tag=${playerTag}`} alt="Profile" />
          <td>
            <Link to={`/player/detail/${player.tag.replace("#", "")}/verify`} className="btn btn-primary">
              Claim Account
            </Link>
          </td>
          {Object.entries(player).map(([key, value]) => (
            <p key={key}>
              {key}: {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      ) : (
        <p>Player not found</p>
      )}
    </div>
  );
}

export default PlayerDetail;
