import { Navigate, useParams } from "react-router-dom";
import cocUrl from "../utils/axios";
import { useState } from "react";
import axios from "axios";

export default function PlayerVerification() {
  const { playerTag } = useParams();
  const [token, setToken] = useState("");
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            const { data } = await axios.post(
              `http://localhost:3000/players/%23${playerTag}/verifytoken`,
              { token: "jbh876hr" }
              //   {
              //     headers: {
              //       "Content-Type": "application/json",
              //       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkyZDQzY2M4LWRjNWQtNDQzNS05YmIwLTg3NTU0YmY5MjU4MCIsImlhdCI6MTcxMDUxMDA1Mywic3ViIjoiZGV2ZWxvcGVyLzgyMjQ0MGM4LTI3M2MtMDJlZC1kNmZhLWM5ZjljNTM5NzBiYiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4xLjIyOC4yMjMiXSwidHlwZSI6ImNsaWVudCJ9XX0.FDa7mqlApimH-9rs3kq2c8EeRaCM0PIx72DKh271qG1pGpXa3MWTexBdoz5iCdHYQOPcts_7xlvfLKVWwexAvQ`,
              //     },
              //   }
            );
            console.log(data);
            Navigate("/");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input value={playerTag} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="token" className="form-label">
            Password
          </label>
          <input value={token} onChange={(event) => setToken(event.target.value)} type="text" className="form-control" id="token" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
