import Link from "next/link";

export default function Custom404() {
  return (
    <div>
      <h1>Page Not Found :/</h1>
      <h3>
        Try this links:
        <Link href="/">
          <a>Home Page</a>
        </Link>
      </h3>
    </div>
  );
}
