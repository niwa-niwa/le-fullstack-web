import Link from "next/link";
import { useAuthContext } from "../helpers/AuthContext";

export default function Navigation() {
  const { authState, setAuthState } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="navbar">
      {authState.status ? (
        <>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/createpost">
            <a>create</a>
          </Link>
        </>
      ) : (
        <></>
      )}
      {!authState.status ? (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/registration">
            <a>Registration</a>
          </Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <h1>{authState.username}</h1>
    </div>
  );
}
