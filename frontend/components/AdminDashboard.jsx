import React from "react";

function AdminDashboard() {
  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  } else {
    window.location.href = "/dashboard/artikel";
  }
}

export default AdminDashboard;
