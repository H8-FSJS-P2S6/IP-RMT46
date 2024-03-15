import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Layouts from "../views/Layouts";
import PlayerDetail from "../views/PlayerDetail";

const router = createBrowserRouter([
  {
    // element: <Home />,
    element: <PlayerDetail />,
    path: "detail/:playerTag",
  },
  {
    // element: <Home />,
    element: <Home />,
    path: "/player/rankings/:country",
  },
  // {
  //   path: "/",
  //   element: (
  //     <>
  //       {/* <Navbar /> */}
  //       {/* <Home /> */}
  //       <Layouts />
  //     </>
  //   ),
  //   children: [
  //     {
  //       element: <Home />,
  //       // element: <PlayerDetail />,
  //       // path: "/2290UCLVV",
  //     },
  //   ],
  // },
]);

export default router;
