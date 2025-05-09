import NavBar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col h-full px-2 md:px-4 mt-2">{children}</div>
    </main>
  );
};

export default Layout;
