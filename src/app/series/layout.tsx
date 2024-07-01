import NavBar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="min-h-screen h-screen flex flex-col">
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
