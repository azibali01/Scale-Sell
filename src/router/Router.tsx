import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router";
import authRouter from "../auth/route/authRouter";
import dashboardRouter from "../dashboard/route/dashboardRouter";

const router = createBrowserRouter([...authRouter, ...dashboardRouter]);

const RouterProvider = () => {
  return <ReactRouterProvider router={router}></ReactRouterProvider>;
};
export default RouterProvider;
