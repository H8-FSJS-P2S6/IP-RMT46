import React, { useEffect, useState} from "react";

function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArtikel = await fetch('http://localhost:3000/categories');
        if (responseArtikel.status === 200) {
          const artikel = await responseArtikel.json();
          setCategory(artikel);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (      
    <div className="container mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.map(perCategory => (
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mb-3" key={perCategory.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="p-4">
                <p className="text-gray-600">{perCategory.name}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category;

