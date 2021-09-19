import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/createpost">
            <a>create</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
