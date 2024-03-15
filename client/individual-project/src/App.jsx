import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import router from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
