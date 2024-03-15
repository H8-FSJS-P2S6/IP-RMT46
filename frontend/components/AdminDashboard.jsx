import React from "react";

function AdminDashboard() {
  if (
    localStorage.getItem("token") === null ||
    localStorage.getItem("token") === "undefined"
  ) {
    window.location.href = "/login";
  }

  return <div>Hello Admin</div>;
}

export default AdminDashboard;
