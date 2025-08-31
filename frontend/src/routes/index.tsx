import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { commonRoutes } from "./common";

import { useUser } from "@/lib/auth";
import Landing from "@/features/Landing";

export const AppRoutes = () => {
  const user = useUser();

  const intialRoute = {
    path: "/",
    element: <Landing />,
  };
  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([intialRoute, ...routes, ...commonRoutes]);

  return <>{element}</>;
};
