interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <main className="min-h-dvh">{children}</main>;
};

export default Layout;
