import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import Layouts from "../views/Layouts";
import PlayerDetail from "../views/PlayerDetail";
import PlayerRankings from "../views/PlayerRankings";
import ClanDetail from "../views/ClanDetail";
import PlayerVerification from "../views/PlayerVerification";
import Login from "../views/Login";
import MyAccounts from "../views/MyAccounts";
import Register from "../views/Register";
import ChangePassword from "../views/ChangePassword";
import ImageGallery from "../views/ImageGallery";
import ClanRankings from "../views/ClanRankings";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
    path: "/login",
  },
  {
    element: <Register />,
    path: "/register",
  },
  {
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
    path: "/",
  },
  {
    element: <ChangePassword />,
    path: "/changepassword",
  },
  {
    element: <MyAccounts />,
    path: "/accounts",
  },
  {
    element: <PlayerDetail />,
    path: "/player/detail/:playerTag",
  },
  {
    element: <PlayerVerification />,
    path: "/player/detail/:playerTag/verify",
  },
  {
    element: <ClanDetail />,
    path: "clan/detail/:clanTag",
  },
  {
    element: <PlayerRankings />,
    path: "/player/rankings",
  },
  {
    element: <ClanRankings />,
    path: "/clan/rankings",
  },
  {
    element: <ImageGallery />,
    path: "/admin/images",
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
