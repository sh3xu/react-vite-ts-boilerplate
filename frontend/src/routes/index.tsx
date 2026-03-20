import { useRoutes } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes";
import { Unauthorized } from "@/pages/shared";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { lazyPage } from "./utils";
import { webRoutes } from "./webRoutes";

const routeConfig = [
  ...authRoutes,
  ...webRoutes,
  ...adminRoutes,
  { path: ROUTES.UNAUTHORIZED, element: <Unauthorized /> },
  { path: "*", element: lazyPage(() => import("@/pages/shared/not-found/NotFound")) },
];

export function AppRoutes() {
  return useRoutes(routeConfig);
}
