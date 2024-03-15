import React, { useState, useEffect } from "react";
import axios from "axios";
import cocUrl from "../utils/axios";

function MyAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await cocUrl.get("/get-account");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>All Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyAccounts;
