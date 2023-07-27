import Menu from "./menu";
export default function Layout({ children }) {
  return (
    <div className="container mx-auto">
      <Menu />
      <div className="pt-10">{children}</div>
    </div>
  );
}
