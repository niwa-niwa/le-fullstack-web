import { useEffect, useState } from "react";
import "../styles/globals.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
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
