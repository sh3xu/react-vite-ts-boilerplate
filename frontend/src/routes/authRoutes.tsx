import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes";
import { lazyPage } from "./utils";

export const authRoutes: RouteObject[] = [
  { path: ROUTES.LOGIN, element: lazyPage(() => import("@/pages/auth/login/Login")) },
  { path: ROUTES.REGISTER, element: lazyPage(() => import("@/pages/auth/register/Register")) },
  { path: ROUTES.FORGOT_PASSWORD, element: lazyPage(() => import("@/pages/auth/forgot-password/ForgotPassword")) },
  { path: ROUTES.OTP_VERIFY, element: lazyPage(() => import("@/pages/auth/otp-verify/OtpVerify")) },
  { path: ROUTES.RESET_PASSWORD, element: lazyPage(() => import("@/pages/auth/reset-password/ResetPassword")) },
];
