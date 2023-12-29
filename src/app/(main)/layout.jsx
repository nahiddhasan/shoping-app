import Notifications from "@/components/Notifications";

const Layout = ({ children }) => {
  return (
    <div>
      <Notifications />
      {children}
    </div>
  );
};

export default Layout;
