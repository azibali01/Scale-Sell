import type { RouteObject } from "react-router";
import DashboardLayout from "../layout/dashboardLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />,
      //   },
    ],
  },
];
export default routes;
