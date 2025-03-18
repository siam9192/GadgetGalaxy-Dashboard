import { IoHomeOutline } from "react-icons/io5";
import { TRoute } from "../types/util.type";
import { FaTruckLoading, FaUserFriends, FaUsersCog } from "react-icons/fa";
import { MdGroups2, MdOutlineAdd } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
const superAdminRoutes: TRoute[] = [
  {
    title: "Home",
    path: "/",
    icon: IoHomeOutline,
    element: <Home />,
  },
  {
    title: "Manage Users",
    path: "/users",
    icon: MdGroups2,
    children: [
      {
        title: "Customers",
        path: "/customers",
        icon: FaUserFriends,
      },
      {
        title: "Administrators",
        path: "/administrator",
        icon: FaUsersCog,
      },
    ],
  },
  {
    title: "Manage Products",
    path: "/products",
    icon: FaBoxes,
    children: [
      {
        title: "All",
        path: "/products/all",
        icon: FaBoxes,
      },
      {
        title: "Add Product",
        path: "/products/add",
        icon: MdOutlineAdd,
        element: <AddProduct />,
      },
    ],
  },
  {
    title: "Orders",
    path: "/orders",
    icon: FaTruckLoading,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: AiOutlineTransaction,
  },
];

export default superAdminRoutes;
