import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
const CommonLayout = () => {
  return (
    <>
      <div className="grid lg:grid-cols-6  h-screen ">
        <div className="col-span-1 h-full lg:block hidden">
          <Sidebar />
        </div>
        <div className="col-span-5 dark:bg-dark-primary bg-gray-100 h-full overflow-y-auto ">
          <Header />
          <div className="lg:p-10 md:p-5 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonLayout;
