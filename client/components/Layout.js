import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <div className="App">{children}</div>
    </>
  );
}
