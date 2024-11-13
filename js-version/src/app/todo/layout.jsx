export default function Layout ({ children }) {
  return (
    <div className="main">
      <h1 className="mainTitle">ToDos</h1>
      <div>{children}</div>
    </div>
  );
}