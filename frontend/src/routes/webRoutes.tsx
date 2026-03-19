import type { RouteObject } from "react-router-dom";
import { WebLayout } from "@/components/layout/WebLayout";
import { ROUTES } from "@/lib/constants/routes";
import { lazyPage } from "./utils";

export const webRoutes: RouteObject[] = [
  {
    element: <WebLayout />,
    children: [
      { path: ROUTES.HOME, element: lazyPage(() => import("@/pages/web/home/Home")) },
      { path: ROUTES.SHOWCASE, element: lazyPage(() => import("@/pages/web/showcase/Showcase")) },
    ],
  },
];
