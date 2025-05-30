import NavBar from "../components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-dvh">
      <NavBar />
      <>{children}</>
    </main>
  );
};

export default Layout;
