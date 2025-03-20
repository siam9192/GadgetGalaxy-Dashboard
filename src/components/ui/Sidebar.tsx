import { TfiMenu } from "react-icons/tfi";
import generalRoutes from "../../routes/generalRoutes";
import superAdminRoutes from "../../routes/superAdmin.routes";
import { formatRouterRoutes, formatSidebarRoutes } from "../../utils/function";
import SidebarButton from "./SidebarButton";
import { IoLogOut } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

interface IProps {
  closeFn?:()=>void
}

const Sidebar = ({closeFn}:IProps) => {
  const routes = formatSidebarRoutes(superAdminRoutes);
  const routesGeneral = formatSidebarRoutes(generalRoutes);
  
  return (
    <div className="h-screen  overflow-y-auto  no-scrollbar dark:bg-dark-secondary p-5">
      <div className="flex items-center justify-between">
        <h1 className="dark:text-white text-4xl font-semibold font-primary">
          Gadget<span className="text-primary">Galaxy</span>
        </h1>
        <button className="text-2xl  text-primary lg:block hidden  ">
          <TfiMenu />
        </button>
        <button onClick={()=>closeFn && closeFn()} className="text-4xl  text-primary  lg:hidden block ">
        <RxCross2 />
        </button>
      </div>

      <div className="mt-5">
        <p className="dark:text-white font-medium uppercase  tracking-[0.15rem]">Menu</p>
        <div className="mt-3 space-y-4">
          {routes.map((route, index) => (
            <SidebarButton route={route} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <p className="dark:text-white font-medium uppercase  tracking-[0.15rem]">Settings</p>
        <div className="mt-3 space-y-4">
          {routesGeneral.map((route, index) => (
            <SidebarButton route={route} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-5 ">
        <div className="flex items-center gap-2  text-black dark:text-white hover:hover:text-info">
          <span className="text-2xl  b">
            <IoLogOut />
          </span>
          <span className="font-medium text-lg ">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
