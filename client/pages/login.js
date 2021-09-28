import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        router.push("/");
      }

      console.log(response.data);
    });
  };

  return (
    <Layout>
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
    </Layout>
  );
}
