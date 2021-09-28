import Link from "next/link";
import { useAuthContext } from "../helpers/AuthContext";

export default function Navigation() {
  const { authState } = useAuthContext();

  return (
    <div className="navbar">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/createpost">
        <a>create</a>
      </Link>
      {!authState && (
        <>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/registration">
            <a>Registration</a>
          </Link>
        </>
      )}
    </div>
  );
}
