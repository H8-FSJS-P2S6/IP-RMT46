import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Layouts from "../views/Layouts";
import PlayerDetail from "../views/PlayerDetail";
import PlayerRankings from "../views/PlayerRankings";
import ClanDetail from "../views/ClanDetail";

const router = createBrowserRouter([
  {
    element: <PlayerDetail />,
    path: "/player/detail/:playerTag",
  },
  {
    element: <ClanDetail />,
    path: "clan/detail/:clanTag",
  },
  {
    element: <PlayerRankings />,
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
