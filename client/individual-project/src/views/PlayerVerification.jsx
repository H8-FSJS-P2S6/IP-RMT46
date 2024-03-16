import React, { useState } from "react";
import { useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function PlayerVerification() {
  const { playerTag } = useParams();
  const [token, setToken] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyToken = async () => {
    try {
      const response = await cocUrl.post(
        `players/%23${playerTag}/verifytoken`,
        { token },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      setVerificationResult(response.data);

      console.log(response.data);

      if (response.data.status != "invalid") {
        const addAccount = await cocUrl.post(
          "/add-account",
          { playerTag: response.data.token },
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        console.log(addAccount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleVerifyToken();
  };

  return (
    <div>
      <h1>Player Verification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Tag: {playerTag}</label>
        </div>
        <div>
          <label>Token:</label>
          <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <button type="submit">Verify Token</button>
      </form>
      {verificationResult && (
        <div>
          <h2>Verification Result</h2>
          <p>Valid: {verificationResult.status ? verificationResult.status.toString() : "Not Available"}</p>
        </div>
      )}
    </div>
  );
}

export default PlayerVerification;
