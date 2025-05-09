import NavBar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <>{children}</>
    </main>
  );
};

export default Layout;
