import type { RouteObject } from "react-router";

import Login from "../pages/Login";
import AuthLayout from "../layout/authLayout";
import LandingPage from "../pages/LandingPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];
export default routes;
