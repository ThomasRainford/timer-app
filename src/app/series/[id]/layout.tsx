interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-2 md:px-4 mt-2">
      {children}
    </div>
  );
};

export default Layout;
