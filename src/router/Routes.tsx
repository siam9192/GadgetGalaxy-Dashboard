import App from "../App";
import CommonLayout from "../layout/CommonLayout";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CommonLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
];

export default routes;
