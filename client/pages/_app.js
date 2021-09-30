import { useEffect, useState } from "react";
import "../styles/globals.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, [setAuthState]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
