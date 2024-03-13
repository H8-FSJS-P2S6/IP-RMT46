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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImI5NWU2ZDQyLWY5YmMtNGMxMi05MDRhLWU0YzM5MDczZGRjYiIsImlhdCI6MTcxMDM0MjMyNSwic3ViIjoiZGV2ZWxvcGVyLzgyMjQ0MGM4LTI3M2MtMDJlZC1kNmZhLWM5ZjljNTM5NzBiYiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4xLjIzMi4xMTEiXSwidHlwZSI6ImNsaWVudCJ9XX0.RRMLM6hf0fAa5cMybw4av-V4qfYRod4HMm0UrAVtr4H5CYcbsjN2EMkYP3Ko3plDMC8jG28fqsZeTwsjJB6lPA`,
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
