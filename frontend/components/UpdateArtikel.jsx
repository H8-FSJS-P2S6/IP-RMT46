
import React, { useState, useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import { useParams } from 'react-router-dom';

function AddArtikel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await baseUrl.get(`/auth/userinfo`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (responseUser.status === 200) {
          const user = await responseUser.data;
          setUser(user);
        } else {
          window.location.href = '/login';
        }

        const responseCategory = await baseUrl.get(`/categories`);
        if (responseCategory.status === 200) {
          const artikel = await responseCategory.data;
          setCategory(artikel);
        }
        const responseArtikel = await baseUrl.get(`/artikel/${id}`);
        if (responseArtikel.status === 200) {
          const artikel = await responseArtikel.data;
          setTitle(artikel.title);
          setDescription(artikel.description);
          setImgUrl(artikel.imgUrl);
          setSelectedCategory(artikel.CategoryId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bodyData = {
        title: title,
        description: description,
        imgUrl: imgUrl,
        CategoryId: selectedCategory,
        UserId: user.id,
      };

      const response = await baseUrl.put(`/artikel/${id}`, bodyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        window.location.href = "/dashboard/artikel";
      } 
    } catch (error) {
      console.error("Error:", error.message);
      const errorContainer = document.getElementById("error-container");
      if (error.response && error.response.data) {
        const customErrorMessage = error.response.data.message || "An unexpected error occurred. Please try again.";
        errorContainer.innerHTML = `<br><p>Error: ${customErrorMessage}</p>`;
      } else {
        errorContainer.innerHTML = `<br><p>Error: ${error.message}</p>`;
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new artikel
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  required
                  rows="4" // Contoh: membuat textarea dengan tinggi awal untuk 4 baris teks
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <label
                htmlFor="imgUrl"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <input
                  name="imgUrl"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  name="category"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
          <div id="error-container" className="text-red-400"></div>
        </div>
      </div>
    </>
  );
}

export default AddArtikel;
