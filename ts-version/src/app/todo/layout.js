export default function Layout ({ children }) {
  return (
    <div className="l-main">
      <h1 className="p-main-title">ToDos</h1>
      <div>{children}</div>
    </div>
  );
}