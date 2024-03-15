import React, { useEffect, useState} from "react";

function AdminDashboard() {
  const [user, setUser] = useState({});
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await fetch('http://localhost:3000/auth/userinfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (responseUser.status === 200) {
          const user = await responseUser.json();
          setUser(user);
        } else {
          window.location.href = '/login';
        }

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
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="GoOrNo Weather"/>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Artikel</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Category</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <div>
                    <button type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                      <div className="ml-3">
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="ml-6">
                  <button className="text-sm font-medium leading-none text-red-400" type="button" onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Artikel</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Category</a>
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
      </div>
  )
}

export default AdminDashboard;
