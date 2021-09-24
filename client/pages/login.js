import { useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <>
      <Navigation />
      <div className="App">
        <div className="loginContainer">
          <label htmlFor="">Username: </label>
          <input
            type="text"
            name=""
            id=""
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name=""
            id=""
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button onClick={login}>Login</button>
        </div>
      </div>
    </>
  );
}
