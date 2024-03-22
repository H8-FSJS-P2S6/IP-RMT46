import React, { useEffect, useState} from "react";
import AdminNavbar from "./AdminNavbar";
import baseURL from "../utils/baseUrl";

function Artikel() {
  const [artikel, setArtikel] = useState([]);

  if (localStorage.getItem("token") === null) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArtikel = await baseURL.get(`/artikel`);
        if (responseArtikel.status === 200) {
          const artikel = responseArtikel.data;
          await Promise.all(artikel.map(async (perArtikel) => {
            const responseCategory = await baseURL.get(`/categories/${perArtikel.CategoryId}`);
            if (responseCategory.status === 200) {
              perArtikel.categoryName = responseCategory.data.name;
            }
            const responseUser = await baseURL.get(`/auth/user/${perArtikel.UserId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
            if (responseUser.status === 200) {
              perArtikel.userEmail = responseUser.data.email;
            }
          }));  
          setArtikel(artikel);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (artikelId) => {
    try {
      const response = await baseURL.delete(`/artikel/${artikelId}`, {
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
      <h1 className="text-3xl font-bold text-center">Artikel List</h1>
      <a href="/dashboard/add-artikel" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</a><br/><br/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artikel.map(perArtikel => (
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mb-3" key={perArtikel.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              {/* <img src={perArtikel.logo} className="w-full" alt={perArtikel.title} /> */}
              <div className="p-4">
                <h2 className="font-bold text-xl leading-loose">{perArtikel.title}</h2>
                <h5 className="leading-loose">{`Author: ${perArtikel.userEmail}`}</h5>
                <h5 className="leading-loose">{`Category: ${perArtikel.categoryName}`}</h5>
                <p className="text-gray-600">{perArtikel.description}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => window.location.href=`/dashboard/update-artikel/${perArtikel.id}`}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => handleDelete(perArtikel.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Artikel;

