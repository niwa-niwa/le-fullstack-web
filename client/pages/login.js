import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuthContext } from "../helpers/AuthContext";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useAuthContext();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
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
