import React, { useState } from "react";
import axios from "axios";
import cocUrl from "../utils/axios";
import { useParams } from "react-router-dom";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cocUrl.put(
        `/change-password/${id}`,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      console.log("Perubahan kata sandi berhasil:", response.data);
    } catch (error) {
      console.log("Perubahan kata sandi gagal:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Ubah Kata Sandi</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kata Sandi Saat Ini:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div>
          <label>Kata Sandi Baru:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label>Konfirmasi Kata Sandi Baru:</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

export default ChangePassword;
