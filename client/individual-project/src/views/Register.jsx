import React, { useState } from "react";
import cocUrl from "../utils/axios";

function Register() {
  const [email, setEmail] = useState("user99@example.com");
  const [password, setPassword] = useState("123");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cocUrl.post("/register", { email, password });
      console.log("Registrasi berhasil:", response.data);
    } catch (error) {
      console.log("Registrasi gagal:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Registrasi Pengguna Baru</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
