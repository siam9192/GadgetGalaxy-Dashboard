import App from "../App";
import CommonLayout from "../layout/CommonLayout";
import superAdminRoutes from "../routes/superAdmin.routes";
import { formatRouterRoutes } from "../utils/function";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CommonLayout />,
        children:formatRouterRoutes(superAdminRoutes),
      },
    ],
  },
];

export default routes;
