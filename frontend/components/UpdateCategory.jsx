
import React, { useState, useEffect } from "react";
import baseUrl from "../utils/baseUrl";
import { useParams } from 'react-router-dom';

function UpdateCategory() {
  const [currentCategory, setCurrentCategory] = useState("");

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategory = await baseUrl.get(`/categories/${id}`);
        if (responseCategory.status === 200) {
          const category = await responseCategory.data;
          setCurrentCategory(category.name);
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
        name: currentCategory,
      };

      const response = await baseUrl.put(`/categories/${id}`, bodyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        window.location.href = "/dashboard/categories";
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
            Update category
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
          <div id="error-container" className="text-red-400"></div>
        </div>
      </div>
    </>
  );
}

export default UpdateCategory;
