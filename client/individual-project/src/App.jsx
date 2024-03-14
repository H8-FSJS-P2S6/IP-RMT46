import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [tester, setTester] = useState({});

  useEffect(() => {
    (async () => {
      // const { data } = await axios.get("http://localhost:3000/");
      const { data } = await axios.get("https://api.clashofclans.com/v1/players/%232290UCLVV", {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIxM2IyOWFhLTA1NDgtNDZkOS1iMDBiLWJhYWI4MzUxMzYwZCIsImlhdCI6MTcxMDQwMDM1Nywic3ViIjoiZGV2ZWxvcGVyLzgyMjQ0MGM4LTI3M2MtMDJlZC1kNmZhLWM5ZjljNTM5NzBiYiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4xLjIzNC40NSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.EhFWdnv8YdCKWyVFBeyL6jK_4BOnAvNhxapNlusDiPYlRH97WJH_759C-bzG162ZqjvXTbNJPNnSL0TEfeHDNA`,
        },
      });
      setTester(data);
      console.log(data);
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
