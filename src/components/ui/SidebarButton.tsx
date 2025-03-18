import { useLocation } from "react-router-dom";
import { TRoute, TSidebarRoute } from "../../types/util.type";
import { MdArrowForwardIos } from "react-icons/md";
import { useState } from "react";
import { FaChild } from "react-icons/fa";
import SideBarChildRoutes from "./SidebarChildRoutes";
interface IProps {
  route: TSidebarRoute;
}

const SidebarButton = ({ route }: IProps) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className={` group flex items-center  justify-between py-3 px-2  rounded-md hover:cursor-pointer   ${route.path === pathname && !route.children?.length ? "bg-primary text-white  " : "text-black dark:text-dark-text-primary"} `}
      >
        <div className="flex items-center gap-2 group-hover:hover:text-primary">
          <span className="text-2xl  b">
            <route.icon />
          </span>
          <span className="font-medium text-lg ">{route.title}</span>
        </div>
        {route.children && route.children.length ? (
          <button
            className={`text-lg ${isOpen ? "rotate-90" : ""} duration-100 hover:scale-120`}
            onClick={() => setIsOpen((p) => !p)}
          >
            <MdArrowForwardIos />
          </button>
        ) : null}
      </div>
      {isOpen && route.children && <SideBarChildRoutes routes={route.children} />}
    </div>
  );
};

export default SidebarButton;
