import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import cocUrl from "../utils/axios";

function ClanDetail() {
  const [clan, setClan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clanTag } = useParams();

  useEffect(() => {
    const fetchClanDetails = async () => {
      try {
        console.log(clanTag, "tagar");
        const response = await cocUrl.get(`/find-clan/${clanTag}`);
        setClan(response.data);
        setLoading(false);
        console.log(response.data, "data");
      } catch (error) {
        console.log(error);
      }
    };

    fetchClanDetails();
  }, [clanTag]);

  return (
    <div>
      <h1>Clans Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : clan ? (
        <div>
          <p>Name: {clan.name}</p>
          <p>Tag: {clan.tag}</p>
          <p>Level: {clan.expLevel}</p>
        </div>
      ) : (
        <p>Clan not found</p>
      )}
    </div>
  );
}

export default ClanDetail;
