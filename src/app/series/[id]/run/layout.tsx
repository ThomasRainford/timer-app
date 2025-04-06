interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="flex flex-col grow">{children}</div>;
};

export default Layout;
