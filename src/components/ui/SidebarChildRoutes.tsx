import { useState } from "react";
import { TSidebarRoute } from "../../types/util.type";
import { MdArrowForwardIos } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const ChildRoute = ({ route }: { route: TSidebarRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className=" group p-1 flex items-center justify-between  hover:cursor-pointer">
     <Link to={route.path}>
     <div className="flex items-center   gap-1">
          <span className="dark:text-white text-sm ">
            <GoDotFill />
          </span>
          <span
            className={` ${isOpen ? "text-primary" : "dark:text-dark-text-primary text-black"} group-hover:hover:text-primary font-medium `}
          >
            {route.title}
          </span>
        </div>
     </Link>
        {route.children && route.children.length ? (
          <button
            className={`text-lg ${isOpen ? "rotate-90" : ""} dark:text-dark-text-primary text-gray-900 duration-100 hover:scale-120`}
            onClick={() => setIsOpen((p) => !p)}
          >
            <MdArrowForwardIos />
          </button>
        ) : null}
      </div>
      {isOpen && route.children && route.children.length ? (
        <SideBarChildRoutes routes={route.children} />
      ) : null}
    </div>
  );
};

function SideBarChildRoutes({ routes }: { routes: TSidebarRoute[] }) {
  return (
    <div className="p-2 space-y-2">
      {routes.map((route, index) => (
        <ChildRoute route={route} key={index} />
      ))}
    </div>
  );
}

export default SideBarChildRoutes;
