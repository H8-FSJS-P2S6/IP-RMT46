import React, { useEffect, useState} from "react";

function Artikel() {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseArtikel = await fetch('http://localhost:3000/artikel');
        if (responseArtikel.status === 200) {
          const artikel = await responseArtikel.json();
          setArtikel(artikel);
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
        {artikel.map(perArtikel => (
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mb-3" key={perArtikel.id}>
            <div className="bg-white shadow-md rounded-lg p-4">
              <img src={perArtikel.logo} className="w-full" alt={perArtikel.title} />
              <div className="p-4">
                <h5 className="text-lg font-bold">{`${perArtikel.UserId} ${perArtikel.CategoryId}`}</h5>
                <p className="text-gray-600">{perArtikel.description}</p>
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

export default Artikel;

