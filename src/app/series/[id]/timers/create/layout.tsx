interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center h-auto items-center bg-base-200 m-3 p-3 py-4 rounded-sm">
      {children}
    </div>
  );
};

export default Layout;
