import React, { useEffect, useState} from "react";
import AdminNavbar from "./AdminNavbar";
import baseURL from "../utils/baseUrl";

function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategory = await baseURL.get(`/categories`);
        if (responseCategory.status === 200) {
          const category = await responseCategory.data;
          setCategory(category);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const response = await baseURL.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <div className="container mt-5">
      <h1 className="text-3xl font-bold text-center">Category List</h1>
      <a href="/dashboard/add-category" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</a><br/><br/>
      <table className="table-auto mx-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2" style={{ textAlign: "center" }}>ID</th>
            <th className="border px-4 py-2" style={{ textAlign: "center" }}>Name</th>
            <th className="border px-4 py-2" style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.map(perCategory => (
            <tr key={perCategory.id}>
              <td className="border px-4 py-2" style={{ textAlign: "center" }}>{perCategory.id}</td>
              <td className="border px-4 py-2" style={{ textAlign: "center" }}>{perCategory.name}</td>
              <td className="border px-4 py-2" style={{ textAlign: "center" }}>          
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => window.location.href=`/dashboard/update-category/${perCategory.id}`}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(perCategory.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Category;

