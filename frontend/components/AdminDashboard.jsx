import React from "react";
import AdminNavbar from "./AdminNavbar";
import Artikel from "./Artikel";
import Category from "./Category";

function AdminDashboard() {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <Artikel></Artikel>
      <Category></Category>
    </>
  )
}

export default AdminDashboard;
