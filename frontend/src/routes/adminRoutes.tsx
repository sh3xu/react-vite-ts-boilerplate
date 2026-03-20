import type { RouteObject } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ROUTES } from "@/lib/constants/routes";
import { lazyPage } from "./utils";

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      { path: ROUTES.ADMIN, element: lazyPage(() => import("@/pages/admin/dashboard/AdminDashboard")) },
      { path: ROUTES.ADMIN_USERS, element: lazyPage(() => import("@/pages/admin/users/Users")) },
      { path: ROUTES.ADMIN_USER_DETAILS, element: lazyPage(() => import("@/pages/admin/users/UserDetails")) },
      { path: ROUTES.ADMIN_ANALYTICS, element: lazyPage(() => import("@/pages/admin/analytics/Analytics")) },
      { path: ROUTES.ADMIN_SETTINGS, element: lazyPage(() => import("@/pages/admin/settings/AdminSettings")) },
      {
        path: ROUTES.ADMIN_SETTINGS_GENERAL,
        element: lazyPage(() => import("@/pages/admin/settings/GeneralSettingsPage")),
      },
      {
        path: ROUTES.ADMIN_SETTINGS_SYSTEM,
        element: lazyPage(() => import("@/pages/admin/settings/SystemSettingsPage")),
      },
      {
        path: ROUTES.ADMIN_SETTINGS_EMAIL,
        element: lazyPage(() => import("@/pages/admin/settings/EmailSettingsPage")),
      },
      { path: ROUTES.ADMIN_SETTINGS_API, element: lazyPage(() => import("@/pages/admin/settings/APISettingsPage")) },
      { path: ROUTES.ADMIN_TEMPLATE_DETAIL, element: lazyPage(() => import("@/pages/admin/template/TemplateDetail")) },
      { path: ROUTES.ADMIN_PROFILE, element: lazyPage(() => import("@/pages/admin/profile/AdminProfile")) },
    ],
  },
];
