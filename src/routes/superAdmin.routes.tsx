import { IoHomeOutline } from "react-icons/io5";
import { TRoute } from "../types/util.type";
import { FaTruckLoading, FaUserFriends, FaUsersCog } from "react-icons/fa";
import { MdGroups2, MdOutlineAdd, MdOutlineCategory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
import AddProductCategory from "../pages/AddProductCategory";
import { TbBrandAirbnb } from "react-icons/tb";
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
        path: "/users/customers",
        icon: FaUserFriends,
      },
      {
        title: "Administrators",
        path: "/users/administrator",
        icon: FaUsersCog,
      },
    ],
  },
  {
    title: "Manage Products",
    path: "/products/all",
    icon: FaBoxes,
    children: [
      {
        title: "All Products",
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
    title: "Manage Categories",
    path: "/categories/all",
    icon: MdOutlineCategory,
    children: [
      {
        title: "All Product Categories",
        path: "/product-categories/all",
        icon: FaBoxes,
      },
      {
        title: "Add Product Category",
        path: "/product-categories/add",
        icon: MdOutlineAdd,
        element: <AddProductCategory />,
      },
    ],
  },
  {
    title: "Manage Brands",
    path: "/brands/all",
    icon: TbBrandAirbnb ,
    children: [
      {
        title: "All Product Categories",
        path: "/brands/all",
        icon: FaBoxes,
      },
      {
        title: "Add Brand",
        path: "/brands/add",
        icon: MdOutlineAdd,
        element: <AddProductCategory />,
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
