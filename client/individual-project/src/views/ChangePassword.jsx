import React, { useState } from "react";
import cocUrl from "../utils/axios";
import { useParams } from "react-router-dom";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cocUrl.put(
        `/change-password`,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      setMessage({ type: "success", content: "Perubahan kata sandi berhasil." });
    } catch (error) {
      setMessage({ type: "danger", content: "Perubahan kata sandi gagal." });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ubah Kata Sandi</h2>
      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.content}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Kata Sandi Saat Ini:
          </label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            id="currentPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            Kata Sandi Baru:
          </label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="newPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">
            Konfirmasi Kata Sandi Baru:
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            id="confirmNewPassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
