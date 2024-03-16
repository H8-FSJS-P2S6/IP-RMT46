import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";

function MyAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await cocUrl.get("/get-account", { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
        setAccounts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDeleteAccount = async (id) => {
    try {
      await cocUrl.delete(`/delete-account/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } });
      setAccounts(accounts.filter((account) => account.id !== id));
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };

  return (
    <div>
      <h2>All Accounts</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.playerTag}</td>
              <td>{account.imgId}</td>
              <td>
                <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAccounts;
